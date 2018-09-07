const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var app = express();
var Applicant = require('./applicant').Applicant;

const PORT = process.env.PORT || 5000;

/*********************************************
                Firebase setup
**********************************************/
var admin = require('firebase-admin');
var hash = require('../firebase/hash.json');
var serviceAccount = require('../firebase/service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nrg-controls-recruitment.firebaseio.com'
});

// References to database
var db = admin.database();
var ref = db.ref();

// Set applicant reference
var applicantRef = ref.child("applicants");
var applicant = new Applicant();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
/*********************************************
                HTTP Requests
**********************************************/
app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

    // Test get function
    .get('/', (req, res) => res.send("HELLO WORLD"))

    // Route parameter middleware (will run before the route is called)
    .param('name', function(req, res, next, name) {
        //next(); // Continue to next function
    })

function validate(app) {
    return !!app.fullName && !!app.email && !!app.yearAndProgram;
}

//Getting post parameters
app.post('/application', function(req, res) {
    if (req.body.hash !== hash.hash) {
        res.status(400).send("xd");
        return;
    }
    
    // Get data from POST request and save to applicant object
    applicant.setResponse(
        req.body.timestamp,
        req.body.fullName,
        req.body.email,
        req.body.yearAndProgram,
        req.body.favoriteLanguage,
        req.body.hardestPartCoding,
        req.body.codingExperience,
        req.body.shapeQuestion,
        req.body.controlQuestion,
        req.body.repairManQuestion   
    )

    // Create a new applicant in the database
    applicantRef.child(applicant.fullName + " - " + applicant.email.replace(".", "dot")).set(applicant);
    res.status(200).send("Application received");
    console.log("Application received: " + applicant.fullName + ' ' + applicant.email + ' ' + applicant.yearAndProgram);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
