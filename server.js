const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
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
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  newIssue.id = issues.length + 1;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  issues.push(newIssue);
  res.json(issues)
});

app.listen(3000, () => {
  console.log("App is running at port 3000")
})