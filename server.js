const http = require("http");
const app = require("./app");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

try {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log("server started");
  });
} catch (err) {
  console.log(err);
}
