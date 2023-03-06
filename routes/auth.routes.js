const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
var bodyParser = require('body-parser');
const cors = require('cors');
/* app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) */

module.exports = function(app) {
app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use((req, res, next)=> {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
   
  app.post("/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, controller.signup);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/refreshtoken", controller.refreshToken);
};   