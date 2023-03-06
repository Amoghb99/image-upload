const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");
const cors = require('cors')
const {upload} = require("../controllers/post.controller")
module.exports = function(app) {
    app.use(cors());
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());

  app.get("/api/post", [authJwt.verifyToken], controller.getPost);

  app.post("/api/post",[authJwt.verifyToken], controller.createPost);

  app.put("/api/post",[authJwt.verifyToken], controller.updatePost);

  app.delete("/api/post",[authJwt.verifyToken], controller.deletePost);

};