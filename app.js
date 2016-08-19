module.exports = function App() {
    "use strict";
    require("./app/index");

    const express = require("express");
    const app = express();
    const port = 8888;
    const path = require('path');
    const exphbs = require('express-handlebars');
    const bodyParser = require('body-parser');

    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'views/layouts')
    }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, 'views'));





    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(function (err, request, response, next) {
        //log the error, for now just console.log
        console.log(err);
        response.status(500).send('Something broke!');
    });

    app.listen(port, function (err) {
        if (err) {
            return console.log("something went wrong", err);
        }

        console.log('server is listening on', port);
    });

    return app;
};
