module.exports = (app, Editor, fetch, crypto, cryption, dir, dotenv) => {
  const jwt = require("jsonwebtoken");

  app.use(async (req, res, next) => {
    if (req.originalUrl.includes("/api/Register/")) return next();

    if (req.headers["authorization"] == null) {
      return res.status(401).json({ ErrorCode: 400, Error: "Invalid Token" });
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (token == process.env.Admin_Token) return next();

    try {
      const decode = jwt.verify(token, process.env.Users_Token);
      req.user = decode;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ ErrorCode: 400, Error: "Invalid Token" });
    }
  });
};
