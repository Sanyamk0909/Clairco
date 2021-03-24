var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const browser = require('./routes/browser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const browserPromise = require('./routes/browser');
const puppeteer = require("puppeteer");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',async(req, res)=>{try {
  let browserPromise = await puppeteer.launch({
    headless: false, 
    args: ['--no-sandbox'],
    devtools: true,
    ignoreHTTPSErrors: true,
    // defaultViewport: {
    //     width: 375,
    //     height: 667,
    //     isMobile: true,
    // },
    timeout: 0,
});
  console.log("brower launched");

  const page = await browserPromise.newPage();
  
 
  await page.goto("https://medium.com/tag/javascript/latest", {
     waitUntil: "networkidle0",
  });
  console.log(page.url());





  //Navigate to Following page
  let blogs = await page.evaluate(() => {
    let names = document.getElementsByClassName('ds-link ds-link--styleSubtle link link--darken link--accent u-accentColor--textNormal u-accentColor--textDarken');
    let titles = document.getElementsByClassName('graf graf--h3 graf-after--figure graf--title');
    let blogs = [ ];
    for(let i = 0 ; i < titles.length;  ++i){
      blogs.push({'title': titles[i].textContent, 'name' : names[i].text});}
      return blogs;
  });
 
  res.send(blogs)
} catch (e) {
  console.log(e);
  res.send('fail');
}

});
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
