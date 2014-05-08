/**
 * TaskRepository class deals with task persistence
 */
function TaskRepository() {
    this.tasks = [];
    this.nextId = 1;
}

/**
 * Find a task by id
 * Param: id of the task to find
 * Returns: the task corresponding to the specified id
 */
TaskRepository.prototype.find = function (id) {
    var task = this.tasks.filter(function(item) {
        return item.taskId == id;
    })[0];
    if (null == task) {
        throw new Error('task not found');
    }
    return task;
}
/**
 * Find the index of a task
 * Param: id of the task to find
 * Returns: the index of the task identified by id
 */
TaskRepository.prototype.findIndex = function (id) {
    var index = null;
    this.tasks.forEach(function(item, key) {
        if (item.taskId == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('task not found');
    }
    return index;
}
/**
 * Retrieve all tasks
 * Returns: array of tasks
 */
TaskRepository.prototype.findAll = function () {
    return this.tasks;
}

/**
 * Save a task (create or update)
 * Param: task the task to save
 */
TaskRepository.prototype.save = function (task) {
    if (task.taskId == null || task.taskId == 0) {
        task.taskId = this.nextId;
        this.tasks.push(task);
        this.nextId++;
    } else {
        var index = this.findIndex(task.taskId);
        this.tasks[index] = task;
    }
 
}

/**
 * Remove a task
 * Param: id the of the task to remove
 */
TaskRepository.prototype.remove = function (id) {
    var index = this.findIndex(id);
    this.tasks.splice(index, 1);
}
/**
 * API
 */
var express = require('express');
var app = express();
var taskRepository = new TaskRepository();
app.configure(function () {
    // used to parse JSON object given in the body request
    app.use(express.bodyParser());
});


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', null);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});


/**
 * HTTP GET /tasks
 * Returns: the list of tasks in JSON format
 */
app.get('/tasks', function (request, response) {
    response.json({tasks: taskRepository.findAll()});
});
/**
 * HTTP GET /tasks/:id
 * Param: :id is the unique identifier of the task you want to retrieve
 * Returns: the task with the specified :id in a JSON format
 * Error: 404 HTTP code if the task doesn't exists
 */
app.get('/tasks/:id', function (request, response) {
    var taskId = request.params.id;
    try {
        response.json(taskRepository.find(taskId));
    } catch (exeception) {
        response.send(404);
    }
    
});
/**
 * HTTP POST /tasks/
 * Body Param: the JSON task you want to create
 * Returns: 200 HTTP code
 */
app.post('/tasks', function (request, response) {
    var task = request.body;
    taskRepository.save({
        text: task.text || 'Default text',
        description: task.description || 'Default description',
        dueDate: task.dueDate,
        done: task.done || false
    });
    response.send(200);
});
/**
 * HTTP PUT /tasks/
 * Param: :id the unique identifier of the task you want to update
 * Body Param: the JSON task you want to update
 * Returns: 200 HTTP code
 * Error: 404 HTTP code if the task doesn't exists
 */
app.put('/tasks/:id', function (request, response) {
    var task = request.body;
    var taskId = request.params.id;
    try {
        var persistedTask = taskRepository.find(taskId);
        taskRepository.save({
            taskId: persistedTask.taskId,
            text: task.text || persistedTask.text,
            description: task.description || persistedTask.description,
            dueDate: task.dueDate || persistedTask.dueDate,
            done: task.done || persistedTask.done
        });
        response.send(200);
    } catch (exception) {
        response.send(404);
    }
});
/**
 * HTTP PUT /tasks/
 * Param: :id the unique identifier of the task you want to update
 * Body Param: the JSON task you want to update
 * Returns: 200 HTTP code
 * Error: 404 HTTP code if the task doesn't exists
 */
app.delete('/tasks/:id', function (request, response) {
    try {
        taskRepository.remove(request.params.id);
        response.send(200);
    } catch (exeception) {
        response.send(404);
    }
});
 
app.set('port', 3000);




// Load the http module to create an http server.
var http = require('http');

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});