var express = require('express');
var app = express();
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mypetdb', {useMongoClient: true})
    .then(function (db) {
        console.log('mongodb has been connected');
    })
    .catch(err => console.error(err));

var Petshop = require('./models/PetshopSchema');
var Service = require('./models/ServiceSchema');
var User = require('./models/UserSchema');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

router.get("/", function (req, res) {
    res.json({"error": false, "message": "Hello World"});
});

// Rotas que irão terminar em '/usuarios' - (servem tanto para: GET All &amp; POST)

router.route("/users")
    .get(function (req, res) {
        var response = {};
        User.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var user = new User();

        //aqui setamos os campos do usuario (que virá do request)
        user.name     = req.body.name;
        user.address  = req.body.address;
        user.phone    = req.body.phone;
        user.email    = req.body.email;
        user.password = req.body.password;

        user.save(function (error) {
            if (error)
                res.send(error);

            res.json({message: 'Usuário criado!'});
        });
    });

router.route("/users/:id")
    .get(function (req, res) {
        var response = {};
        User.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .put(function (req, res) {
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        User.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // we got data from Mongo.
                // change it accordingly.
                if (req.body.email !== undefined) {
                    // case where email needs to be updated.
                    data.emaiil = req.body.email;
                }

                if (req.body.address !== undefined) {
                    // case where password needs to be updated
                    data.address = req.body.address;
                }

                if (req.body.password !== undefined) {
                    // case where password needs to be updated
                    data.passwordd = req.body.password;
                }

                if (req.body.phone !== undefined) {
                    // case where password needs to be updated
                    data.phone = req.body.phone;
                }

                // save the data
                data.save(function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error updating data"};
                    } else {
                        response = {"error": false, "message": "Data is updated for " + req.params.id};
                    }
                    res.json(response);
                })
            }
        })
    })
    .delete(function (req, res) {
        var response = {};
        // find the data
        User.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                // data exists, remove it.
                User.remove({_id: req.params.id}, function (err) {
                    if (err) {
                        response = {"error": true, "message": "Error deleting data"};
                    } else {
                        response = {"error": true, "message": "Data associated with " + req.params.id + "is deleted"};
                    }
                    res.json(response);
                });
            }
        })
    });


router.route("/petshops")
    .get(function (req, res) {
        var response = {};
        Petshop.find(function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var petshop = new Petshop();

        //aqui setamos os campos do usuario (que virá do request)
        petshop.name                = req.body.name;
        petshop.address             = req.body.address;
        petshop.latitude            = req.body.latitude;
        petshop.longitude           = req.body.longitude;
        petshop.number_of_customers = req.body.number_of_customers;
        petshop.favorite            = req.body.favorite;
        petshop.since               = req.body.since;
        petshop.image_url           = req.body.image_url;

        petshop.save(function (error) {
            if (error)
                res.send(error);

            res.json({message: 'Petshop criado!'});
        });
    });

    router.route("/petshops/:id")
    .get(function (req, res) {
        var response = {};
        Petshop.findById(req.params.id, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    });

router.route("/services")
    .get(function (req, res) {
        var response = {};
        Service.find({}, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })
    .post(function (req, res) {
        var service = new Service();

        service.id_petshop    = req.body.id_petshop;
        service.name          = req.body.name;
        service.image_service = req.body.image_service;
        service.value         = req.body.value;

        service.save(function (error) {
            if (error)
                res.send(error);

            res.json({message: 'Service criado!'});
        });
    });

router.route("/services/:id_petshop")
    .get(function (req, res) {
        var response = {};
        Service.find({id_petshop : req.params.id_petshop}, function (err, data) {
            // This will run Mongo Query to fetch data based on ID.
            if (err) {
                response = {"error": true, "message": "Error fetching data"};
            } else {
                response = {"error": false, "message": data};
            }
            res.json(response);
        });
    })


app.use('/', router);

var server = app.listen(3000);

console.log('Servidor Express iniciado na porta %s', server.address().port);