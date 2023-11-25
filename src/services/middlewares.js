import jwt from "jsonwebtoken";

const SECRET = `${process.env.JWT_SECRET}`;

export const userAuthentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      console.log("current: ", req.user);
      req.user = user;
      console.log("after: ", req.user);
    });
  }
};
