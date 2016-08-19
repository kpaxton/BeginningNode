module.exports = function Routes(app, database) {
    "use strict";

    app.get('/', function (request, response) {
        response.render('home', {
            name: 'Kevin'
        });
    });

    app.post('/users', function (request, response) {
        console.log(request.body);
        const user = request.body;
        database.getDB().then(function (db) {
            console.log("in then operation");
            database.insertUser(db, user);
            response.send('successfully registered');
        })
            .catch(function (err, db) {
                console.log("in catch");
                console.log(err);
                db.close();
                response.send('error in processing post.');
                return;
            });

    });

    app.get('/users', function (request, response) {
        database.getDB().then(function (db) {
            console.log("in then operation");
            var collection =  db.collection('users');

            collection.find().toArray(function (err, users) {
                console.log("retrieved Collection");
                // var userString = "Users: ";
                // for (var i = 0; i < users.length; i++){
                //     console.log(JSON.stringify(users[i]));
                //     userString += JSON.stringify(users[i]);
                // }
                response.render('users', {
                    users:users
                });
                //response.send(userString);
            });
        })
        .catch(function(err, db){
            console.log("error caught");
            console.log(err);
            db.close();
            response.send("error");
        });
    })
};
