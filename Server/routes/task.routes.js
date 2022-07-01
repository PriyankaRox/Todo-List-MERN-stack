const taskController = require('../controllers/task.controllers');

module.exports = function(app){
    app.get('/api/tasks', taskController.getAlltasks);
    app.post('/api/task/new', taskController.createtask);
    app.get('/api/task/:id', taskController.gettask);

    app.get('/api/tasks/due', taskController.getDueTasks);
    
    app.get('/api/tasks/low', taskController.getLowTasks);
    app.get('/api/tasks/medium', taskController.getMediumTasks);
    app.get('/api/tasks/high', taskController.getHighTasks);

    app.put('/api/tasks/:id/updateDone', taskController.updategetDoneTask)
    app.get('/api/tasks/done', taskController.getDoneTasks);
    app.get('/api/tasks/notDone', taskController.getNotDoneTasks);
    app.put('/api/tasks/:id/update', taskController.updatetask);
    app.delete('/api/task/:id/delete', taskController.deletetask);
}
 