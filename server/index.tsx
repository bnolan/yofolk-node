import { getPosts, getPostById } from './posts'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { render } from 'preact-render-to-string';
import Post from '../app/views/post'

const app = express();
const port = 3000;

if (process.env.NODE_ENV != 'production') {
  app.set('json spaces', 2)
}


app.use(bodyParser.json());
app.use(express.static('public'))

bodyParser.urlencoded({
  extended: true,
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

// Api

app.get('/api/posts', async (req, res) => {
  let results = await getPosts()
  res.status(200).json(results.rows);
})
app.get('/api/posts/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())
  res.status(200).json(results.rows);
})

// Views

app.get('/p/:id', async (req, res) => {
  let results = await getPostById(req.params.id.toString())
  res.status(200).send(render(<body><link href='/theme.css' type='text/css' rel='stylesheet' /><Post post={results.rows[0]} /></body>));
})

// app.post('/users', db.createUser);
// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});