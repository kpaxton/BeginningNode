module.exports = function Database(configuration) {
    "use strict";
    const mongoClient = require('mongodb').MongoClient;
    const url = "mongodb://PAXTONIA:27017/test";

    var getDB = function(callback) {
        console.log("called getDB");
        var promise = new Promise(function(resolve, reject){
            console.log("attempting connection");
            mongoClient.connect(url, function(err, db){
                console.log("in connection callback");
                if(err) {
                    console.log("rejected");
                    reject(err);
                }
                resolve(db);
                console.log("resolved");
            });
        });
        console.log("returning promise");
        return promise;
    }
    var insertUser = function(db, user){
        var collection = db.collection('users');
        collection.insert({name: user.name, age: user.age});
        db.close();
    }
    var dbModel = {
        users: []
    };

    return {
    "getDB": getDB,
    "insertUser": insertUser
    };
};
