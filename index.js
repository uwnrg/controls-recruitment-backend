const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var newpage = require('./newpage');

// const applicantModule = require('./applicant');
// const Applicant = applicantModule.Applicant;
// console.log(applicantModule);

/*********************************************
				Class Defintions
**********************************************/
class Applicant {
    constructor() {        
    }
    setQuestionResponse(fullName, email, yearAndProgram = "", favoriteLanguage = "", codingExperience = "", codingQuestions = {}) {
        this.fullName = fullName;
        this.email = email;
        this.yearAndProgram = yearAndProgram;
        this.favoriteLanguage = favoriteLanguage;
        this.codingExperience = codingExperience;
        this.codingQuestions = codingQuestions; 
    }
}
/*********************************************
				Firebase setup
**********************************************/
var admin = require('firebase-admin');
var serviceAccount = require('./firebase/serviceaccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nrg-controls-recruitment.firebaseio.com'
});
// Make reference to database
var db = admin.database();
var ref = db.ref();
// Create children
var applicantRef = ref.child("applicants");

var applicant4 = new Applicant();
applicant4 = {
    fullName: "Jeff Niu",
    email: "jeffniu22@gmail.com",
    yearAndProgram: "2B mechatronics",
    favoriteLanguage: "questionA",
    hardestPartCoding: "questionB",
    codingExperience: "questionC",

    codingQuestions: {
    	shapeQuestion: {
    		response: "question1",
    		language: "c_cpp"
    	},
    	controlQuestion: {
    		response: "question2",
    		language: "c_cpp"    		
    	},
		repairManQuestion: {
			response: "question3",
    		language: "c_cpp"   
		}
    }
};

applicantRef.child("applicant4").set(applicant4);

/*********************************************
				HTTP Requests
**********************************************/
express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
	.get('/hello', (req, res) => res.send('Hello World!'))
	.get('/cool', (req, res) => res.send(cool()))

//Get parameters from URL
	.get('/users/:userId', function (req, res) {
		var id = req.params.userId
		res.send(id)
	})
	.get('/world', function (req, res) {
		res.send('hello world')
	})

//Connecting the contents in the newpage.js file to index.js
	.use('/newpage', newpage)

	.post('/post', function (req, res) {
		res.send('POST request to the homepage');
	})

	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
