const express = require ('express');
const app= express();

app.use((req,res)=>
{res.end('Hola desde express');}
);

module.exports= app;