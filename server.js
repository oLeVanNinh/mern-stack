const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan', created: new Date('2018-08-15'),
    effort: 5, completionDate: undefined, title: 'Error in console when clicking Add'
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddied', created: new Date('2018-08-13'),
    effort: 15, completionDate: new Date('2018-08-23'), title: 'Missing bottom border on panel'
  },
]

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

app.listen(3000, () => {
  console.log("App is running at port 3000")
});
