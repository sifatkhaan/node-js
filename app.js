const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const app = express();
const dbURI = 'mongodb+srv://testproject:test1234@nodeproject.ymdmx.mongodb.net/first-node?retryWrites=true&w=majority&appName=NodeProject';

mongoose.connect(dbURI).then((result) =>
  app.listen(3001)
).catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.set('views', './views');

//middleware and static file
app.use(express.static("public"));
app.use(express.urlencoded())
app.use(morgan('dev'));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about new blog'
  });
  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
});
//get all 
app.get('/get-all', (req, res)=>{
  Blog.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})
//get single 
app.get('/get-single', (req, res)=>{
  Blog.findById('6740cb481a6a0e3db3e8c881')
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.use((req, res, next) => {
  console.log('new request made')
  console.log('host', req.hostname)
  console.log('path', req.path)
  console.log('method', req.method)
  next()
})

app.use((req, res, next) => {
  console.log('into to the next middleware')
  next()
})

app.get('/', (req, res) => {
  res.redirect('/blogs')
})
app.get('/blogs', (req, res)=>{
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
    res.render('index', { title: 'Home', blogs:result })
  }).catch((err)=>{
    console.log(err)
  })
})
app.post('/blogs', (req, res)=>{
const blog = new Blog(req.body)
blog.save()
.then((result)=>{
  res.redirect('/blogs')
}).catch((err)=>{
  console.log(err)
})
})
app.get('/about', (req, res) => {
  res.render('about', { title: 'about' })
})
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'create' })
})
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})