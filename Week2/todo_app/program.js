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

    var createTodoItem = 'INSERT INTO todo_items(id, text, is_completed, user_id) VALUES(?,?,?,?)';
    var updateTodoItem = 'UPDATE todo_items SET id = ?, text = ? WHERE user_id = ?';
    var deleteTodoItem = 'DELETE FROM todo_items WHERE id = ?';
    var deleteTodoTag = 'DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?'; 
    var addTodoTag = 'INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(?,?)';
    var updateIsCompleted = 'UPDATE todo_items SET is_completed = ? WHERE id = ?';

    create(description, callback) {
        // Write code and query to create a new TODO item
        dbConnection.query(createTodoItem, [46, 'take kids to school', F, 5], function (err, res) {
            if (err) throw err;
            else {
                console.log('A new To DO item was created.');
            }
        });
    }

    update(id, description, callback) {
        // Write code and query to update an existing TODO item
        dbConnection.query(updateTodoItem, [47, 'wash clothes', 5], function (err, res) {
            if (err) throw err;
            else {
                console.log('Updated todo item.');
            }
        });
    }

    delete (id, callback) {
        // Write code and query to delete an existing TODO item
        dbConnection.query(deleteTodoItem, [47], function (err, res) {
            if (err) throw err;
            else {
                console.log('Todo item deleted');
            }
        });
    }

    tagTodoItem(todoItemId, tagId, callback) {
        // Write code and query add a tag to a TODO item
        dbConnection.query(addTodoTag, [48,5], function (err, res) {
            if (err) throw err;
            else {
                console.log('Todo item tag added.');
            }
        }); 
    }

    untagTodoItem(todoItemId, tagId, callback) {
        // Write code and query remove a tag from a TODO item
        dbConnection.query(deleteTodoTag, [43,3], function (err, res) {
            if (err) throw err;
            else {
                console.log('Todo item tag deleted.');
            }
        }); 
    }

    markCompleted(todoItemId, callback) {
        // Write code to mark a TODO item as completed
        dbConnection.query(updateIsCompleted, [46, T], function (err, results, fields) {    // deleted a ")" 
            if (err) {
                callback(err);
                console.log('unable to mark todo item as completed.');
                return;
            }

            callback(null, results);
            console.log('todo item marked as completed');
        });
    }

}

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'todo user',
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
});