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
categoriesDrop.addEventListener('change', getValues);
questionsDrop.addEventListener('change', getValues);
startButton.addEventListener("click", createQuestions);
resetButton.addEventListener("click", refreshPage);

/**
* Functions
**/
function getValues(params) {
    questions = document.getElementById("questions").value;
    categories = document.getElementById("categories").value;
}

function test() {
    console.log(freshGame);
    console.log("I'm a little teapot");
    console.log(questions,categories);
}

function createQuestions() {
    if (freshGame == 0) {
        freshGame = 1;
        let makeCategories = categories;
        let makeQuestions = questions;
        let questionsHere = document.getElementById('questionsHere');
        
        while (makeCategories > 0) {
            makeQuestions = questions;
            var newCat = document.createElement("form");
            var catLabel = document.createElement("label");
            var catInput = document.createElement("input");
            newCat.className = "category";
            catInput.className = "input-box"
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
                ansLabel.className = "answer";
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
        } else {alert("Please hit the 'Reset me button' to make a new game")}
    }
    
    function refreshPage() {
    // var r = confirm("Are you sure you want to start again from the beginning?")
    // if (r) {
    //     // put code here after testing
    // }
        window.location.reload(false);
        freshGame = 0;
    }