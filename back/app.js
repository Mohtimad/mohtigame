const express = require('express');
const app = express();

//authorized header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static("public"))


app.get('/*',function (req, res) {
  res.sendFile('public/index.html', { root: __dirname })
})


module.exports = app;