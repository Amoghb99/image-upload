const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const cors = require('cors')

module.exports = function(app) {
  app.use(cors());
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

};