/**
 * Global Variables
 */
var startButton = document.getElementById("startButton"); 
var resetButton = document.querySelector('.resetButton');
var questionsDrop = document.getElementById('questions');
var categoriesDrop = document.getElementById('categories');
var questions = document.getElementById("questions").value;
var categories = document.getElementById("categories").value;
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

var test = function () {
    console.log();
    console.log("I'm a little teapot");
    console.log(questions,categories);
    console.log(gameQuestionIds,gameAnswerIds);
}

function createQuestions() {
    if (freshGame == 0) {
        freshGame = 1;
        let makeCategories = categories;
        let makeQuestions = questions;
        let questionsHere = document.getElementById('questionsHere');
        var gameQuestionIds = [];
        var gameAnswerIds = [];

        while (makeCategories > 0) {
            makeQuestions = questions;
            var newCat = document.createElement("form");
            var catLabel = document.createElement("label");
            var catInput = document.createElement("input");
            newCat.className = "category";
            catInput.className = "input-box"
            catInput.id = `C${makeCategories}`;
            catLabel.textContent = "Category name: ";
            catInput.placeholder = "Category name here";
            newCat.appendChild(catLabel);
            newCat.appendChild(catInput);
            let questionNumber = 1;
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
                gameQuestionIds.push(queInput.id);
                ansLabel.className = "answer";
                ansInput.id = `C${makeCategories}A${questionNumber}`;
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
        /**
        * Submit button
        **/
        var finishedButton = document.createElement("button");
        finishedButton.id = "createGameBtn";
        finishedButton.textContent = "I'm done!";
        questionsHere.appendChild(finishedButton);
        document.getElementById('C5Q1');
        
        finishedButton.addEventListener("click", function() {
            var gameValues = [];
            for (i=0; i<gameQuestionIds.length; i++) {
                let currentQuestionId = gameQuestionIds[i];
                let currentAnswerId = gameAnswerIds[i];
                let currentQuestionValue = document.getElementById(currentQuestionId).value;
                let currentAnswerValue = document.getElementById(currentAnswerId).value;
                let currentCategory = Number(gameQuestionIds[i].charAt(1));
                let currentQuestion = Number(gameQuestionIds[i].charAt(3))
                let currentObject = {
                    cnum: currentCategory,
                    qnum: currentQuestion,
                    question: currentQuestionValue,
                    answer: currentAnswerValue
                }
                gameValues.push(currentObject);
            }
            console.log(gameValues);
        });
        } 
        
        
        
        
        else {alert("Please hit the 'Reset me button' to make a new game")}
    }
    

    function refreshPage() {
    // var r = confirm("Are you sure you want to start again from the beginning?")
    // if (r) {
    //     // put code here after testing
    // }
        window.location.reload(false);
        freshGame = 0;
    }