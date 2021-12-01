/*const jsonServer = require('json-server');
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
})*/

const express = require('express')
const { Router } = require('react-router')

var app = express()
app.use(express.json({limit: '50mb'}))
const router = require('express').Router()

router.route('/').get((req, res) => {
   console.log(res)
})//.catch(err => res.status(400).json(`Error ${err}`))