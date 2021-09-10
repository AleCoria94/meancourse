const express = require ('express');
const bodyParser = require ('body-parser');
const app= express();
const cors = require ('cors');

const mongoose = require ("mongoose");

const Post = require ('./models/posts');

mongoose.connect ("mongodb+srv://ALEX:<PASSWORD>@cluster0.vfroy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
 console.log("Te conectaste a la base"); 
}).catch (()=> {
 console.log("Error en la conexión"); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT,PATCH, DELETE, OPTIONS"
    );
    next();
  });

  const whiteList = ['http://localhost:3000/api/posts']
  app.use(cors({origin: whiteList}))

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

app.delete("/api/posts/:id", (req,res,next)=>{
Post.deleteOne({id: req.params._id}).then(result =>{
res.status(200).json({message: "Post eliminado"});
});
  
});

module.exports= app;