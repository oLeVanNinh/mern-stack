const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const issue = require('./issue.js');
const path = require('path');
const url = 'mongodb://localhost:27017';
const dbName = 'issuetracker';
let db;

MongoClient.connect(url, { userNewUrlParser: true} )
  .then(connection => {
    console.log("connected to the server");
    db = connection.db(dbName);
  })
  .catch(err => console.log(err));



const app = express();
app.use(express.static('static'));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const webpack = require('webpack');
const config = require('../webpack.config');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(config);

app.use(devMiddleware(compiler, {log: console.log}));
app.use(hotMiddleware(compiler, {noInfo: true}));

app.get('/api/issues', (req, res) => {
  db.collection('issues').find({}).toArray()
    .then(issues => {
      const meta_data = { total_count: issues.length };
      res.json({_metadata: meta_data, records: issues })
    })
    .catch(err => console.log(err));
});

app.post('/api/issues', (req, res) => {
  console.log(req.body);
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  db.collection('issues').insertOne(newIssue)
    .then(result => {
       res.json(result.ops[0]);
    })
    .catch(err => console.log(err))
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/'));
})

app.listen(3000, () => {
  console.log("App is running at port 3000")
});
