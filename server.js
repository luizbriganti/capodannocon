/*const jsonServer = require('json-server');
const app = jsonServer.create();
const path = require('path');
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

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, './build', 'index.html')))

app.use(router)

app.listen(port, () => {
   console.log('Server is running')
})*/

const jsonServer = require('json-server')
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8000;

const server = express()

/*const middlewares = jsonServer.defaults(
   {
      static: './build'
   }
);
server.use('/api', middlewares)

server.use(jsonServer.rewriter({   
   '/api/*': '/$1'
}))*/

server.use('/api', jsonServer.router('db.json'));

server.use(express.static(path.join(__dirname, './build')));

server.get('/', (req,res) =>{
   res.sendFile(path.join(__dirname,'./build','index.html'));
});

server.get('*', (req,res) =>{
   res.sendFile(path.join(__dirname,'./build','index.html'));
});

server.listen(port)