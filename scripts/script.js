var questions = document.getElementById("questions").value;
var categories = document.getElementById("categories").value;
var startButton = document.getElementById("startButton");
var resetButton = document.querySelector('.resetButton');

function test() {
    console.log("I'm a little teapot");
}

startButton.addEventListener("click", createQuestions);
resetButton.addEventListener("click", refreshPage);

function createQuestions() {
    let makeCategories = categories;
    let makeQuestions = questions;
    let questionsHere = document.getElementById('questionsHere');
    
    while (makeCategories > 0) {
        makeQuestions = questions;
        
        var newCat = document.createElement("div");
        newCat.className = "category";
        newCat.textContent = `This is category ${makeCategories}`;
        // console.log(`category: ${makeCategories}`);
        while (makeQuestions > 0) {
            var newQue = document.createElement("div");
            newQue.textContent = `This is question ${makeQuestions}`;
            newQue.className = "question";
            questionsHere.appendChild(newCat);
            newCat.appendChild(newQue);
            // console.log(`question: ${makeQuestions}`);
            makeQuestions--;
        }
        questionsHere.appendChild(newCat);
        makeCategories--;
    }
}

function refreshPage() {
    // var r = confirm("Are you sure you want to start again from the beginning?")
    // if (r) {
    //     window.location.reload();
    // }
window.location.reload();
}