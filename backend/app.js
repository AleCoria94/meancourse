const express = require ('express');
const bodyParser = require ('body-parser');
const app= express();

const Post = require ('./models/posts');

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
    console.log(post);
    res.status(201).json({
      message: 'Post added successfully'
    });
    next();
  });

app.get('/api/posts',(req,res,next)=>{
const posts = [
{ 
    id:'4556',
    title : 'Primer posteo desde el backend',
    content: 'Este sería el primer párrafo'
},
{ 
    id:'xhxg',
    title : 'Segundo posteo desde el backend',
    content: 'Este sería el segundo párrafo'
}];
    
  return res.status(200).json({
      message: 'Los posts sean unidos, esa es la ley primera',
      posts: posts
  });  
});

module.exports= app;