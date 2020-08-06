// eslint-disable-next-line @typescript-eslint/no-var-requires
const Axios = require("axios");

module.exports = (req, res, next) => {
  if (req.url === "/users" && req.method === "POST") {
    Axios.post("http://localhost:3001/usersData", {
      properties: [
        {
          name: "name",
          value: "value"
        }
      ]
    });
  }
  next();
};
