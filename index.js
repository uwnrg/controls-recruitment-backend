const express = require('express');
const path = require('path');
var newpage = require('./newpage');
var bodyParser = require('body-parser');
var app = express();

const PORT = process.env.PORT || 5000;
// const applicantModule = require('./applicant');
// const Applicant = applicantModule.Applicant;
// console.log(applicantModule);

/*********************************************
                Class Defintions
**********************************************/
class Question {
    constructor() {        
    }
    setQuestionResponse(language = "", response = "") {
        this.Language = language;
        this.Response = response;
    }
}

class Applicant {
    constructor() { 
        var ShapeQuestion = new Question();
        var ControlQuestion = new Question();
        var RepairManQuestion = new Question();       
    }
    setResponse(fullName, email, program = "", year = "", 
        favoriteLanguage = "", hardestPartCoding = "", codingExperience = "", 
        shapeQuestion = {}, controlQuestion = {}, repairManQuestion = {}) {
        
        this.fullName = fullName;
        this.email = email;
        this.program = program;
        this.year = year;

        this.favoriteLanguage = favoriteLanguage;
        this.hardestPartCoding = hardestPartCoding;
        this.codingExperience = codingExperience;

        this.shapeQuestion = shapeQuestion;
        this.controlQuestion = controlQuestion;
        this.repairManQuestion = repairManQuestion;
        //this.codingQuestions = codingQuestions;     //codingQuestions doesn't save to database if blank
    }
}

/*********************************************
                Firebase setup
**********************************************/
var admin = require('firebase-admin');
var serviceAccount = require('./firebase/service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nrg-controls-recruitment.firebaseio.com'
});

// Make reference to database
var db = admin.database();
var ref = db.ref();

var applicantRef = ref.child("applicants");
var applicant = new Applicant();
/*********************************************
                HTTP Requests
**********************************************/
app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))

//Route parameter middleware (will run before the route is called)
    .param('name', function(req, res, next, name) {
        //next(); //continue to next function
    })

//Getting post parameters (accepting data from webpage)
app.post('/application', function(req, res) {
    var user_id = req.body.id;

    // var fullName = req.body.fullName;
    // var email = req.body.email;
    applicant.setReponse(
        req.body.fullName,
        req.body.email,
        req.body.program,
        req.body.year,
        req.body.favoriteLanguage,
        req.body.hardestPartCoding,
        req.body.codingExperience,
        req.body.shapeQuestion,
        req.body.controlQuestion,
        req.body.repairManQuestion   
    )
    // applicant.fullName = "bob";
    // applicant.email = "asdfhjkl@gmail.com";
    // applicant.program = req.body.program;
    // applicant.year = req.body.year;

    // applicant.favoriteLanguage = req.body.favoriteLanguage;
    // applicant.hardestPartCoding = req.body.hardestPartCoding;
    // applicant.codingExperience = req.body.codingExperience;

    // applicant.shapeQuestion = req.body.shapeQuestion; 
    // applicant.controlQuestion = req.body.controlQuestion; 
    // applicant.repairManQuestion = req.body.repairManQuestion; 

    console.log("Application received: " + fullName + ' ' + email + ' ' + program + ' ' + year);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


/*********************************************
               Write to database
**********************************************/
// // Create a new applicant
// var applicant = new Applicant();
// //applicant.setResponse("bob", "asdkfjh@adf.com");
// applicant.setReponse(
//     fullName,
//     email,
//     program,
//     year,
//     favoriteLanguage,
//     hardestPartCoding,
//     codingExperience,
//     shapeQuestion,
//     controlQuestion,
//     repairManQuestion   
//     );

applicantRef.child(applicant.fullName).set(applicant);

