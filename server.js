var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({extended: true }));
app.use(express.json());

var reservation = [
    {
        customerEmail: "chefchino",
        customerId: "chino",
        customerName: "Cip",
        phoneNumber: "919-555-9876"
    },
    {
        customerEmail: "adam",
        customerId: "adam",
        customerName: "adam",
        phoneNumber: "919-555-9896"
    },
    {
        customerEmail: "paul",
        customerId: "paul",
        customerName: "paul",
        phoneNumber: "919-555-9776"
    },
    {
        customerEmail: "alex",
        customerId: "alex",
        customerName: "alex",
        phoneNumber: "919-555-9856"
    }

];

var waitingList = [
    {
        customerEmail: "jarez",
        customerId: "456789",
        customerName: "Jarez Howell",
        phoneNumber: "919-555-9976"
    },
    
    {
        customerEmail: "grace",
        customerId: "456734",
        customerName: "grace",
        phoneNumber: "919-555-9816"
    }
]
// Connects to homepage
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
// connects to reservation page
app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});
// Connects to tables.html
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});
// Displays reservations
app.get("/api/tables", function(req, res) {
    return res.json(reservation);
});
// Displays waiting list
app.get("/api/waitingList", function(req, res) {
    return res.json(waitingList);
});

// Display tables with first 5 of waiting list moved to reservations

app.get("/api/waitingList/:reser", function(req, res) {
    

    for ( var i = 0; i < waitingList.length; i++) {

        if (reservation < 5) {
            reservation.push(waitingList[0]);
            waitingList.shift();
            return res.json(reservation);
        }
    }
    return res.json(false);
    
});
app.post("/api/waitingList", function(req, res) {
    var newReservation = req.body;

    newReservation.customerName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    waitingList.push(newReservation);
    res.json(newReservation);
});

app.listen(PORT, function() {
    console.log("App Listening on PORT " + PORT);
});