const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const List = require('./models/list');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// To get the home page at start
app.get('/', function(req, res){
    List.find({}, function(err, tasks){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "To-Do List",
            todo_list: tasks
        });
    })
})

// function to create and add task to database
app.post('/create-task', function(req, res){
    List.create({
        task: req.body.task,
        category: req.body.category,
        due_date: req.body.due_date
    }, function(err, newTask){
        if(err){
            console.log('Error in creating a contact!')
            return res.redirect('back');
        }
            console.log('******', newTask);
            return res.redirect('back');
    })
});


// for deleting all the tasks in the database
app.get('/delete-all', function(req, res){
    List.deleteMany({}, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
    
});


// To Listening the server on a port
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})