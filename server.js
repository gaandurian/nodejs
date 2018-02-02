const r_express = require('express');
const r_hbs = require('hbs');
const r_fs = require('fs');

let app = r_express();

r_hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'r_hbs');

app.use((req, resp, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log();
  r_fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, resp, next) => {
//   resp.render('maintenance.hbs');
// });

app.use(r_express.static(__dirname+'/public'));
r_hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

r_hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

  app.get('/', (req, resp) => {
    resp.render('home.hbs', {
      welcomeMessage: `Hello and welcome ! this is the best welcome message you will ever see.`,
      pageTitle: 'Home page',
      currentYear: new Date().getFullYear(),
    });
  });


app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'Rendered About page',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/bad', (req, resp) => {
  resp.send({
    status: 404,
    error: true,
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
