const http = require("http");

const app = require("./app");
const { sequelize } = require("./util/db");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await sequelize.sync({ force: false });
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log("server started");
    });
  } catch (err) {
    console.log(err);
  }
}

main();
