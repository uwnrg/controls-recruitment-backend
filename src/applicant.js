class Applicant {
    constructor() {     
    }
    setResponse(fullName = "", email = "", yearAndProgram = "", 
        favoriteLanguage = "", hardestPartCoding = "", codingExperience = "", 
        shapeQuestion = {}, controlQuestion = {}, repairManQuestion = {}) {
        
        this.fullName = fullName;
        this.email = email;
        this.yearAndProgram = yearAndProgram;

        this.favoriteLanguage = favoriteLanguage;
        this.hardestPartCoding = hardestPartCoding;
        this.codingExperience = codingExperience;

        this.shapeQuestion = shapeQuestion;
        this.controlQuestion = controlQuestion;
        this.repairManQuestion = repairManQuestion;
    }
}

module.exports.Applicant = Applicant;
