const express = require('express');
const app = express();
//morgan middleware
const morgan = require('morgan');
const mongoose = require('mongoose')


const dbURI = 'mongodb+srv://mainaBlogs:maina1234@cluster0.0twtg4t.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result) => console.log('DB connected'))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//listen for request
app.listen(3006);


//morgan middleware & static files ie css
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {

    //Passign data to views
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'In publishing and graphic design, Lorem ipsum is a'},
        {title: 'Mario finds stars', snippet: 'In publishing and graphic design, Lorem ipsum is a'},
        {title: 'How to defeat bowser', snippet: 'In publishing and graphic design, Lorem ipsum is a'}

    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'})
});

 
app.get('/blogs', (req, res) => {
    res.render('blogs', {title: 'blogs'})
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})