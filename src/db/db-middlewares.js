// eslint-disable-next-line @typescript-eslint/no-var-requires
const Axios = require("axios");

module.exports = (req, res, next) => {
  // console.log("[req]", req.body);
  // console.log("[req]", req.url);
  // console.log("[req]", req.method);

  if (req.url === "/users" && req.method === "POST") {
    Axios.post("http://localhost:3001/usersData", {
      properties: [
        {
          name: "name",
          value: "value"
        }
      ]
    });
    console.log("LOL");
  }
  next();
};
