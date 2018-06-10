/**
 * Global Variables
 */
var startButton = document.getElementById("startButton"); 
var resetButton = document.querySelector('.resetButton');
var questionsDrop = document.getElementById('questions');
var categoriesDrop = document.getElementById('categories');
var questions = document.getElementById("questions").value;
var categories = document.getElementById("categories").value;
var questionsHere = document.getElementById('questionsHere');
var gameHere = document.getElementById('gameHere');
var gameQuestionIds = [];
var gameAnswerIds = [];
var gameCategoryIds = [];
var gameValues = [];
var freshGame = 0;

/**
* Event Listeners
**/
categoriesDrop.addEventListener('change', checkNumbers);
questionsDrop.addEventListener('change', checkNumbers);
startButton.addEventListener("click", createQuestions);
resetButton.addEventListener("click", refreshPage);

/**
* Functions
**/
function checkNumbers() {
    questions = document.getElementById("questions").value;
    categories = document.getElementById("categories").value;
}

function test() {
    console.log();
    console.log("I'm a little teapot");
    console.log(questions,categories);
    console.log(gameQuestionIds,gameAnswerIds);
}

function getGameValues() {
    for (i = 0; i < gameQuestionIds.length; i++) {
        var currentQuestionId = gameQuestionIds[i];
		var currentAnswerId = gameAnswerIds[i];
		var currentCategoryId = `C${gameQuestionIds[i].charAt(1)}`;
		var currentCategoryName = document.getElementById(currentCategoryId).value;
        var currentQuestionValue = document.getElementById(currentQuestionId).value;
        var currentAnswerValue = document.getElementById(currentAnswerId).value;
        var currentCategory = Number(gameQuestionIds[i].charAt(1));
        var currentQuestion = Number(gameQuestionIds[i].charAt(3));
        var currentObject = {
            cname: currentCategoryName,
            qnum: currentQuestion,
            question: currentQuestionValue,
            answer: currentAnswerValue
		};
		// console.log(currentCategoryName);
        gameValues.push(currentObject);
	}

    // console.log(gameValues);
    return gameValues;
}

function createGame(gameData) {
	questionsHere.style.display = "none";
    var catNum = 1; 
    for (let i = 0; i < gameData.length; i++) {
        var tv = gameData[i];
		if (tv.cname !== lastCat || i == 0) {
            /******** Create div for category ********/
			var categoryDiv = document.createElement("div");
			categoryDiv.textContent = tv.cname;
            categoryDiv.className = "catDiv";
            categoryDiv.id = `tvcat${catNum}`;
			gameHere.appendChild(categoryDiv);
            var lastCat = tv.cname;
            catNum++;
            
            /******** Create div for first question in category ********/
			var showQuestion = document.createElement("div");
            var queNum = tv.qnum;
            showQuestion.textContent = 10;
            showQuestion.className = "display-question";
            showQuestion.id = `displayQuestionC${catNum-1}Q${queNum}`;
            categoryDiv.appendChild(showQuestion);
            showQuestion.addEventListener('click', function () {
                console.log(this.id);
            });
		} else {
            /******** Create div for remaining questions in category ********/
			var showQuestion = document.createElement("div");
            var queNum = tv.qnum;
            switch (queNum) {
                case 2:
                    showQuestion.textContent = 20;
                    break;
                case 3:
                    showQuestion.textContent = 30;
                    break;
                case 4:
                    showQuestion.textContent = 40;
                    break;
                case 5:
                    showQuestion.textContent = 50;
                    break;
                default:
                    break;
            }
            showQuestion.className = "display-question";
            showQuestion.id = `displayQuestionC${catNum-1}Q${queNum}`;
            categoryDiv.appendChild(showQuestion);
            showQuestion.addEventListener('click', function () {
                console.log(this.id);
            });
		}        
    }
}
function createQuestions() {
    if (freshGame == 0) {
        freshGame = 1;
        var makeCategories = categories;
        var makeQuestions = questions;

        while (makeCategories > 0) {
            makeQuestions = questions;
            var newCat = document.createElement("form");
            var catLabel = document.createElement("label");
            var catInput = document.createElement("input");
            newCat.className = "category";
            catInput.className = "input-box";
			catInput.id = `C${makeCategories}`;
			catInput.value = `C${makeCategories}`; //DELETE THIS
			gameCategoryIds.push(catInput.id);
            catLabel.textContent = "Category name: ";
            catInput.placeholder = "Category name here";
            newCat.appendChild(catLabel);
            newCat.appendChild(catInput);
            var questionNumber = 1;
            while (makeQuestions > 0) {
                var queDiv = document.createElement("div");
                var queLabel = document.createElement("label");
                var queInput = document.createElement("input");
                var ansLabel = document.createElement("label");
                var ansInput = document.createElement("input");
                queLabel.textContent = `Question #${questionNumber}: `;
                ansLabel.textContent = `Answer #${questionNumber}: `;
                queLabel.className = "question";
                queInput.id = `C${makeCategories}Q${questionNumber}`;
                queInput.value = `C${makeCategories}Q${questionNumber}`; //DELETE THIS
                gameQuestionIds.push(queInput.id);
                ansLabel.className = "answer";
                ansInput.id = `C${makeCategories}A${questionNumber}`;
                ansInput.value = `C${makeCategories}A${questionNumber}`; //DELETE THIS
                gameAnswerIds.push(ansInput.id);
                queInput.className = "input-box";
                ansInput.className = "input-box";
                queInput.placeholder = `Question ${questionNumber}`;
                ansInput.placeholder = `Answer ${questionNumber}`;
                queDiv.appendChild(queLabel);
                queDiv.appendChild(queInput);
                queDiv.appendChild(ansLabel);
                queDiv.appendChild(ansInput);
                newCat.appendChild(queDiv);
                makeQuestions--;
                questionNumber++;
                }
                questionsHere.appendChild(newCat);
                makeCategories--;
            }
            
        /******** Submit button ********/
        var finishedButton = document.createElement("button");
        finishedButton.id = "createGameBtn";
        finishedButton.textContent = "I'm done!";
        questionsHere.appendChild(finishedButton);
        document.getElementById('C5Q1');
        
        finishedButton.addEventListener("click", () => { createGame(getGameValues());});
        }
        
        
        
        
        else {alert("Please hit the 'Reset me button' to make a new game");}
    }
    



function refreshPage() {
// var r = confirm("Are you sure you want to start again from the beginning?")
// if (r) {
//     // put code here after testing
// }
    window.location.reload(false);
    freshGame = 0;
}