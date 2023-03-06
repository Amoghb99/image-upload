const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
var bodyParser = require('body-parser')

const db = require("./models/index");
const dbConfig = require('./config/db.config');
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/post.routes')(app);
app.use(cors());
dotenv.config()

const port = process.env.PORT;

app.use(cors({
  credentials:true,
  origin: ['http://localhost:PORT']
}));

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* MONGODB CONNECTION */
db.mongoose
  .connect(`mongodb://localhost:27017/alpha_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


app.get("/", (req, res) => {
    res.json({ message: "Welcome to ALPHA" });
  });


app.listen(port, () =>{
    console.log(`Listening on Port ${port}`);
});