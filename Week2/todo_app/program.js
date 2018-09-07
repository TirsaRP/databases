// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    // Loads all the TODOs in the database
    load(callback) {
        const selectTodoItems = "SELECT * FROM todo_items";
        this.dbConnection.query(selectTodoItems, function (err, results, fields) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, results);
        });
    }

    create(description, callback) {
        // Write code and query to create a new TODO item
        const createTodoItem = 'INSERT INTO todo_items SET ?';
        dbConnection.query(createTodoItem, description, function (err, res) {
            if (err) {
                callback(err);
                return;
            }
                callback(null, res);
        });
    }

    update(id, description, callback) {
        // Write code and query to update an existing TODO item
        const updateTodoItem = 'UPDATE todo_items SET text = ? WHERE user_id = ?';
        dbConnection.query(updateTodoItem, id,description, function (err, res) {
            if (err) {
                callback(err);
                return;
            }
                callback(null, res);
        });
    }

    delete (id, callback) {
        // Write code and query to delete an existing TODO item
        const deleteTodoItem = 'DELETE FROM todo_items WHERE id = ?';
        dbConnection.query(deleteTodoItem, id, function (err, res) {
            if (err) {
                callback(err);
                return; 
            }
                callback(null, res);
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        const addTodoTag = 'INSERT INTO todo_item_tag SET ?';
        dbConnection.query(addTodoTag, todoItemId, tagId, function (err, res) {
            if (err) {
                callback(err);
                return; 
            }
                callback(null, res);
        }); 
    }

    untagTodoItem([todoItemId, tagId], callback) {
        // Write code and query remove a tag from a TODO item
        const deleteTodoTag = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?'; 
        dbConnection.query(deleteTodoTag, [todoItemId, tagId], function (err, res) {
            if (err) {
                callback(err);
                return;
            }
                callback(null, res);
        }); 
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        const updateIsCompleted = 'UPDATE todo_items SET is_completed = TRUE WHERE id = ?';
        dbConnection.query(updateIsCompleted, todoItemId, function (err, results, fields) {    // deleted a ")" 
            if (err) {
                callback(err);
                return;
            }
            callback(null, results);
        });
    }

}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo',
    password: 'password',
    database: 'todo_app'
});

dbConnection.connect(function (err) {
    if (err != null) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConnection.threadId);

    const todoModel = new TodoModel(dbConnection);
    todoModel.load(function (err, todoItems) {
        if (err) {
            console.log("error loading TODO items:", err);
        }

        console.log("existing todo items:", todoItems);
    });

    todoModel.create({text: 'go to conference', user_id: 4}, function(err, res){
        if (err){
            console.log('unable to create new TO DO item', err);
        }
        console.log('A new To DO item was successfully created');
    });

    todoModel.update([3,'prepare for class discussions'], function(err, res){
        if (err){
            console.log('unable to update TO DO item', err);
        }
        console.log('Updated TO DO item successfully');
    });

    todoModel.delete(42, function(err,res){
        if (err){
            console.log('unable to delete existing TO DO item', err);
        }
        console.log('TO DO item successfully deleted');
    });

    todoModel.tagTodoItem({todo_item_id:47, tag_id:5}, function(err,res){
        if (err){
            console.log('unable to add tag to TO DO item', err);
        }
        console.log('TO DO item tag successfully added.');
    });

    todoModel.untagTodoItem([45,1], function(err,res){
        if(err){
            console.log('unable to delete tag from TO DO item', err);
        }
        console.log('TO DO item tag successfully deleted.');
    });
    todoModel.markCompleted(42, function(err, res){
        if (err){
            console.log('unable to mark TO DO item as completed', err);
        }
        console.log('TO DO item successfully marked as completed');
    });
});