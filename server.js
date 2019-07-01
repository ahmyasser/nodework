const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

var port =  process.env.PORT || 3000 ;

var app = express();
app.use(express.static( __dirname + '/public'));

app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partails');
hbs.registerHelper('year',()=>{
    return new Date().getFullYear();
});

app.use((req,res,next) =>{
var log = new Date().toString()+': '+ req.method+ ' ' +req.url;

console.log(log);

fs.appendFile('server.log',log+' \n', (err)=>{
    if(err){
        console.log('not appending');
    }});

    // res.render('maintenance.hbs',{
    //     title: 'temp page',
    //     paragraph: 'the website is under maintenance'});
    next();
});

hbs.registerHelper('screamIt',(Sstring)=>
    {
       return Sstring.toUpperCase();
    }
)
app.get('/', (req,res) =>{
    res.render('home.hbs',
        {
            probs : {
                name: 'ahmed',
                job: 'computer engineer',
                likes: [
                    'blowjobs',
                    'fucks']

            },
    title: 'homepage',
    paragraph: 'welcome to the home page'
});
});

app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        title: 'we are the about',
        paragraph:'fuck yourself good'
});
});

app.get('/bad',(req,res)=>{
    res.send({
        title:404,
        request:'baf request',
        type:'not found'
    });

});
app.listen(port,() => {

    console.log("listening to port "+ port);
});
