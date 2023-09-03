import { getPosts, getSummary, getPostsByUser, createComment, getPostById, createPost, getUsers, deleteComment, deletePost } from './posts'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { render } from 'preact-render-to-string';
import * as cookieParser from 'cookie-parser'
import { ethers } from 'ethers'

import Home from '../app/views/home'
import Post from '../app/views/post'
import User from '../app/views/user'
import NotFound from '../app/views/not-found'

const app = express();
const port = process.env.PORT || 3000

if (process.env.NODE_ENV != 'production') {
  app.set('json spaces', 2)
}

let users = {}

main () 

type wallet = string
export interface AuthenticatedRequest extends express.Request {
  user: wallet
}

async function main (){
  let rows = await getUsers()

  rows.forEach(u => {
    users[u.eth_address] = u.name
  })
}

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

bodyParser.urlencoded({
  extended: true,
})

// Api


function page (component) {
  return render(
    <html>
      <head>
        <script src="/bundle.js" />
        <link href='/theme.css' type='text/css' rel='stylesheet' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo.svg" />
        <title>yo folk</title>
      </head>
      <body>
        {component}
      </body>
    </html>
  );
}

// Views

app.get('/', async (req, res) => {
  res.status(200).send(page(<Home />))
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});