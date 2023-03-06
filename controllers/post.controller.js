const Post = require("../models/post.model");
const db = require("../models/post.model");
const multer = require('multer');
const express = require('express')
const app = express();
const cors = require("cors");
app.use(cors());

const DIR = './images';

const Fileinformation = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },

    filename: (req, file, cb) => {
      const fileName = file.originalname.randomVar
      cb(null, fileName)
      return fileName;
    }
});

exports.upload = multer({
    storage: Fileinformation,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
 
exports.getPost = async(req,res) => {
  console.log(req.authorization,"token")
  const token = req.authorization;
    const posts = await db.find();

      if (!posts) {
        throw new Error("No posts found");
      }
      else{  
        res.send(posts);
      }
}
exports.createPost = async(req,res) => {
  console.log("body",req.body);
    const posts = new Post({
      title : req.body.title,
      desc : req.body.desc,
      tags : req.body.tags, 
      date : new Date(),
      profileImg: req.body.downloadurl,
      } 
    );   
  
    posts.save((err, posts) => {
      if (err) {
        res.status(500).send({ message: err });
        return err;
      }
console.log("posts",posts)
    res.send({ message: "Post was saved successfully!", data: posts }); 
    });
  }  
   
  exports.updatePost = (req,res) => {

    Post.findOneAndUpdate({_id:req.body.id}, {title: req.body.title, desc:req.body.title, tags:req.body.tags},(error,data) => {
      if(error){
          return error;
      } else{
          res.send(data);
      }
  });
}

  exports.deletePost = async(req,res) => {

    try{
      await db.findByIdAndDelete({_id:req.body.id})
      res.send("Post is Deleted with id: " + req.body.id);
    }catch(err){
      res.send(err)
    }
}
