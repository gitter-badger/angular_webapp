/**
 * A better way to do it is to look at the TaskRepository class 
  */

// Load the http module to create an http server.
var express = require('express');
var http = require('http');
var cors = require('cors');

//configure server
var app = express();
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.set('port', 3000);


// in memory data
var tasks = [
    {text:'Build AngularJS app', done:true, id: 0},
    {text:'Say hi!', done:false, id: 1}];

var nextId = 2;


//Get tasks
app.get('/tasks', function(req, res) {
	console.log('GET on /tasks');
	res.send(tasks)
});

//Create tasks
app.post('/tasks', function(req, res) {
	console.log('POST on /tasks');
	nextId++;
	console.log(" CURRENT ID IS " + nextId);
	var newTask = {text : req.body.text, done: req.body.done, id: nextId};
	tasks.push(newTask)
	res.send(tasks)
});

// Update tasks
app.put('/tasks/:id', function (req, res) {
	console.log('PUT on /tasks');
	for (var i = 0; i < tasks.length; i++) {
    	if (tasks[i].id == req.params.id) {
    		tasks[i].done = req.body.done;
    	}
	}
	res.send(tasks)
});

//delete tasks
app.delete('/tasks/:id', function (req, res) {
	console.log('DELETE on /tasks');
	for (var i = 0; i < tasks.length; i++) {
    	if (tasks[i].id == req.params.id) {
    		tasks.splice(i,1);
    	}
	}
	res.send(tasks)
});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
