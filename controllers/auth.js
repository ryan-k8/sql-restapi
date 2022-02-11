const querystring = require("query-string");
const axios = require("axios");

const { signToken, verifyToken } = require("../util/jwt");

function getGoogleOauth2URL() {
  const redirectURI = "auth/google";
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `http://localhost:${process.env.PORT}/${redirectURI}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${querystring.stringify(options)}`;
}

async function getTokens({ code, clientId, clientSecret, redirectURI }) {
  try {
    const url = "https://accounts.google.com/o/oauth2/token";
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectURI,
      grant_type: "authorization_code",
    };
    const { data } = await axios.post(
      `${url}?${querystring.stringify(values)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (err) {
    console.log(err.stack);
    throw new Error(err.message);
  }
}

exports.redirect2Login = async (req, res, next) => {
  try {
    const oauth2LoginURI = getGoogleOauth2URL();
    res.redirect(oauth2LoginURI);
  } catch (err) {
    console.log(err);
  }
};

exports.handleOauth2Login = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.sendStatus(400);
    }

    const { id_token: idToken, access_token: accessToken } = await getTokens({
      code: code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `http://localhost:${process.env.PORT}/auth/google`,
    });

    const { data: userProfileData } = await axios.get(
      `https://openidconnect.googleapis.com/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    /**
     * TODO:if not exists user, create one in db (async)
     */

    const token = await signToken(userProfileData.email, "1h");

    /**
     * @idToken temporary token which will be used to get access token
     */
    res.cookie("idToken", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.generateAccessToken = async (req, res, next) => {
  try {
    const idToken = req.cookies["idToken"];

    const { id: email } = await verifyToken(idToken);

    const accessToken = await signToken(email, "1d");

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
