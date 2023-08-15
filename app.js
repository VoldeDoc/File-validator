const express = require('express');
const app = express()
const session = require('express-session')
const flash = require('simple-flash')
const port = process.env.PORT || 5000
const multer  = require('multer');
const picture = require('./model/picture');
const filevalidating = require('./fileValidator');
const upload = multer({ dest: 'upload/' })
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


app.use(function (req, res, next)  {
  res.locals.formErrors = req.session.formErrors
  res.locals.formBody = req.session.formBody
  delete req.session.formErrors
  delete req.session.formBody
  next()
})

app.use(flash())

app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/',upload.single('photo'),filevalidating, async(req,res)=>{
  let saves = new picture(req.body)
  if(await saves.save()){
  req.flash('success','upload success')
  res.redirect('/')
  }
  else{
    req.flash('error','upload failed')
    res.redirect('/')
  }
} )

app.set('view engine','ejs')
app.set('views','views')

app.listen(port,()=>{
console.log( `server running on http://localhost:${port}`);
})