import express from 'express'
import path from 'path'

const jsonServer = require('json-server');
const app = jsonServer.create();
//const path = require('path');
//const express = require('express');
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults(
   {
      static: './build'
   }
);
const port = process.env.PORT || 8000;

app.use(middlewares);

app.use(jsonServer.rewriter({   
   '/api/*': '/$1'
}))

app.use(router)

app.listen(port, () => {
   console.log('Server is running')
})

const server = express() 

server.set('etag', 'strong')

server.use('/*', (req, res) => {
   res.sendFile(path.join(__dirname, './build', 'index.html'))
})