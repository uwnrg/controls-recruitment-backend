//Creating a generic applicant object
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
