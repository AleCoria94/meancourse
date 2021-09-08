const express = require ('express');
const bodyParser = require ('body-parser');
const app= express();

const mongoose = require ("mongoose");

const Post = require ('./models/posts');

mongoose.connect ("mongodb+srv://ALEX:<password>@cluster0.vfroy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
 console.log("Te conectaste a la base"); 
}).catch (()=> {
 console.log("Error en la conexión"); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post("/api/posts", (req, res, next) => {
    const post = new Post ({
      title : req.body.title,
      content : req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    });
    next();
  });

app.get('/api/posts',(req,res,next)=>{
Post.find().then(documents=> {
  return res.status(200).json({
      message: 'Los posts sean unidos, esa es la ley primera',
      posts: documents
      })
    });  
});

module.exports= app;