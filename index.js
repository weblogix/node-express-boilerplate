const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`));


app.get('/', (request, response) => {
    // app.locals.showheader = false;
    response.render('pages/index',
        { title: 'Hey Hey Hey!', message: 'Yo Yo'}
    );
  });

app.get('/product/:id', (request, response) => {
    // app.locals.showheader = request.params.id.includes('header');

    response.render('pages/${request.params.id}', {
        id: request.params.id,
    });
});


app.listen(port, function () {  
    console.log('App is listening on port ' + port)
})


// app.use((err, req, res) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });