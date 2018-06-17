/* 
todo:
create scoreboard
create button to add points at the value of the question
create choose number of teams?
change numbers so it can't be less than 4 questions or categories?
add plus/minus buttons?
add final jeopardy
add edit button
*/

/**
 * Global Variables
 */
var startButton = document.getElementById("startButton");
var resetButton = document.getElementById('resetButton');
var editButton = document.getElementById('editButton');
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
var freshScoreboard = true;
var showingQuestion = false;

/**
 * Event Listeners
 **/
categoriesDrop.addEventListener('change', checkNumbers);
questionsDrop.addEventListener('change', checkNumbers);
startButton.addEventListener("click", createGameInputs);
resetButton.addEventListener("click", refreshPage);
editButton.addEventListener("click", editGame);

/**
 * Functions
 **/

/******** listens to drop downs and registers change ********/
function checkNumbers() {
    questions = document.getElementById("questions").value;
    categories = document.getElementById("categories").value;
}

/******** creates inputs for game data to be entered ********/
function createGameInputs() {
    /******** Initial check for if the start button has been pressed ********/
    /******** Not pressed ********/
    if (freshGame == 0) {
        freshGame = 1;
        var makeCategories = categories;
        var makeQuestions = questions;

        /******** create inputs for selected number of categories and add to id array ********/
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
            var questionNumber = 1; //sets number to count up from 1 instead of down from 5

            /******** create inputs for selected number of questions and add to id array ********/
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
                queInput.value = `I'm a question!!! C${makeCategories}Q${questionNumber}`; //DELETE THIS
                gameQuestionIds.push(queInput.id);
                ansLabel.className = "answer";
                ansInput.id = `C${makeCategories}A${questionNumber}`;
                ansInput.value = `I'm an answer!!! C${makeCategories}A${questionNumber}`; //DELETE THIS
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

        finishedButton.addEventListener("click", () => {
            createGameBoard(getGameValues());
        });
    }
    /******** pressed ********/
    else {
        alert("Please hit the 'Reset me button' to make a new game");
    }
}

/******** puts input values into object ********/
function getGameValues() {
    /******** use id array to make objects of input values, returns gameValues object ********/
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
            qId: currentQuestionId,
            cname: currentCategoryName,
            qnum: currentQuestion,
            question: currentQuestionValue,
            answer: currentAnswerValue
        };
        gameValues.push(currentObject);
    }

    /******** data validation ********/
    for (i = 0; i < gameCategoryIds.length; i++) {
        if (document.getElementById(`errorMessage${i}`) != null) {
            var errMsg = document.getElementById(`errorMessage${i}`);
            errMsg.remove();
        }
    }

    var errors = 0;
    for (i = 0; i < gameCategoryIds.length; i++) {
        var catNameCheck = document.getElementById(gameCategoryIds[i]);
        if (catNameCheck.value == "") {
            var errMsg = document.createElement("div");
            errMsg.textContent = "You need a category name to continue!";
            errMsg.id = `errorMessage${i}`;
            var catLabelDiv = document.getElementById(gameCategoryIds[i]).parentElement;
            catLabelDiv.insertBefore(errMsg, catLabelDiv.childNodes[0]);
            errors++;
        }
    }

    if (errors > 0) {
        gameValues = [];
        return 0;
    }

    // console.log(gameValues);
    return gameValues;
}

/******** creates the game board with data ********/
function createGameBoard(gameData) {
    /******** Hide the input section ********/
    if (gameData !== 0) {
        questionsHere.style.display = "none";
        var catNum = 1;
        /******** show edit button ********/
        if (editButton.style.display == "") {
            editButton.style.display = "inline";
        }

        /******** Create div for category ********/
        for (let i = 0; i < gameData.length; i++) {
            var tv = gameData[i];
            var queNum, showQuestion;
            /******** Is this a new category?  Yes: ********/
            if (tv.cname !== lastCat || i == 0) {
                var categoryDiv = document.createElement("div");
                categoryDiv.textContent = tv.cname;
                categoryDiv.className = "catDiv";
                categoryDiv.id = `tvcat${catNum}`;
                gameHere.appendChild(categoryDiv);
                var lastCat = tv.cname;
                catNum++;

                /******** Create div for first question in category ********/
                showQuestion = document.createElement("div");
                queNum = tv.qnum;
                showQuestion.textContent = 10;
                showQuestion.className = "display-question";
                showQuestion.id = `displayQuestionC${catNum - 1}Q${queNum}`;
                categoryDiv.appendChild(showQuestion);
                showQuestion.addEventListener('click', displaySingleQuestion);
            } else {
                /******** Is this a new category?  No: ********/
                /******** Create div for remaining questions in category ********/
                showQuestion = document.createElement("div");
                queNum = tv.qnum;
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
                showQuestion.id = `displayQuestionC${catNum - 1}Q${queNum}`;
                categoryDiv.appendChild(showQuestion);
                showQuestion.addEventListener('click', displaySingleQuestion);
            }
        }
        scoreboard();
    } else {
        return 0;
    }
}

/******** shows questions/answers ********/
function displaySingleQuestion() {
    /******** get question ID in form of C#Q# ********/
    var qId = this.id.substr(this.id.length - 4);

    /******** search for the right question, store question and answer variables ********/
    if (showingQuestion == false) {
        for (i = 0; i < gameValues.length; i++) {
            if (gameValues[i].qId == qId) {
                var queCard = gameValues[i].question;
                var ansCard = gameValues[i].answer;
            }
        }

        /******** create question display ********/
        var bigCard = document.createElement("div");
        bigCard.id = "shownQuestion";
        bigCard.className = "modal";
        var bigCardContent = document.createElement("div");
        bigCardContent.textContent = queCard;
        var answerButton = document.createElement("button");
        answerButton.textContent = "What's the answer???";
        answerButton.id = "answerButton";
        bigCard.appendChild(bigCardContent);
        bigCard.appendChild(answerButton);
        gameHere.appendChild(bigCard);

        showingQuestion = true;
        this.className = "display-question clicked";

        /******** event listener for answer button ********/
        answerButton.addEventListener('click', function () {
            /******** remove question div ********/
            gameHere.removeChild(document.getElementById('shownQuestion'));

            /******** create answer answer display ********/
            var bigCard = document.createElement("div");
            bigCard.id = "shownAnswer";
            bigCard.className = "modal";
            var bigCardContent = document.createElement("div");
            bigCardContent.textContent = ansCard;
            var closeButton = document.createElement("button");
            closeButton.textContent = "Oh man!!";
            closeButton.id = "closeButton";
            bigCard.appendChild(bigCardContent);
            bigCard.appendChild(closeButton);
            gameHere.appendChild(bigCard);

            /******** event listener for close button ********/
            closeButton.addEventListener('click', function () {
                //remove answer div
                gameHere.removeChild(document.getElementById('shownAnswer'));
                showingQuestion = false;
            });
        });
    }
}

/******** allows game to be edited after first creation ********/
function editGame() {

    var editConf = confirm("Warning! Your questions will be saved, but scores and progress will be lost");
    if (editConf) {
        questionsHere.style.display = "flex";
        while (gameHere.firstChild) {
            gameHere.removeChild(gameHere.firstChild);
            gameValues = [];
            freshScoreboard = true;
        }
    }
}

function scoreboard() {
    /******** create scoreboard button ********/
    var scoreboardBtn = document.createElement("button");
    scoreboardBtn.id = "scoreboardBtn";
    scoreboardBtn.textContent = "Scores";
    gameHere.appendChild(scoreboardBtn);

    /******** create scoreboard display ********/
    var scoreboardDiv = document.createElement("div");
    scoreboardDiv.id = "scoreboard";
    scoreboardDiv.className = "modal";
    var scoreboardDivContent = document.createElement("div");
    scoreboardDivContent.textContent = "Scoreboard!!";
    var sbCloseButton = document.createElement("button");
    sbCloseButton.textContent = "Close Scoreboard";
    sbCloseButton.id = "sbCloseButton";
    scoreboardDiv.appendChild(scoreboardDivContent);
    gameHere.appendChild(scoreboardDiv);
    scoreboardDiv.style.display = "none";

    /******** scoreboard btn event listener ********/
    scoreboardBtn.addEventListener('click', function () {
        /******** First time making a scoreboard?: Yes ********/
        if (freshScoreboard) {
            freshScoreboard = false;

            /******** team numbers select number ********/
            var teamNumbersDiv = document.createElement("div");
            teamNumbersDiv.id = "teamNumbersDiv";
            teamNumbersDiv.textContent = "Number of teams?";
            scoreboardDiv.appendChild(teamNumbersDiv);
            var teamNumbersPrompt = document.createElement("form");
            teamNumbersPrompt.id = "teamNumbersPrompt";
            var teamNumbersDrop = document.createElement("select");
            teamNumbersDrop.id = "teamNumbersDrop";
            for (i = 2; i < 9; i++) {
                var teamNumbersOption = document.createElement("option");
                teamNumbersOption.textContent = i;
                teamNumbersDrop.appendChild(teamNumbersOption);
            }
            var teamNumbersSubmit = document.createElement("button");
            teamNumbersSubmit.id = "teamNumbersSubmit";
            teamNumbersSubmit.textContent = "Let's Go!";

            /******** team number submit button event listener ********/
            teamNumbersSubmit.addEventListener("click", function (e) {
                var chosenTeamsNumber = teamNumbersDrop.value;
                scoreboardDiv.style.display = "none";
                var scoresHere = document.createElement("div");
                scoresHere.id = "scoresHere";
                scoreboardDiv.appendChild(scoresHere);
                for (i = 0; i < chosenTeamsNumber; i++) {
                    var teamScoreDiv = document.createElement("div");
                    teamScoreDiv.id = `team${i+1}ScoreDiv`;
                    teamScoreDiv.className = "score-div";
                    var teamScoreName = document.createElement("div");
                    teamScoreName.id = `team${i+1}ScoreName`;
                    teamScoreName.textContent = `Team ${i+1}:`;
                    var teamScoreValue = document.createElement("div");
                    teamScoreValue.id = `team${i+1}ScoreValue`;
                    teamScoreValue.textContent = "0";
                    teamScoreDiv.appendChild(teamScoreName);
                    teamScoreDiv.appendChild(teamScoreValue);
                    scoresHere.appendChild(teamScoreDiv);
                }

            });

            teamNumbersDiv.appendChild(teamNumbersPrompt);
            teamNumbersPrompt.appendChild(teamNumbersDrop);
            teamNumbersDiv.appendChild(teamNumbersSubmit);

            scoreboardDiv.style.display = "flex";
        } 
        /******** First time making a scoreboard?: No ********/
        else {
            scoreboardDiv.style.display = "flex";
            scoreboardDiv.appendChild(sbCloseButton);
            if (document.getElementById('teamNumbersDiv') !== null) {
                document.getElementById('teamNumbersDiv').remove();
            }
        }
    });

    /******** close scoreboard event listener ********/
    sbCloseButton.addEventListener('click', function () {
        scoreboardDiv.style.display = "none";
    });

}

/******** resets the game to beginning ********/
function refreshPage() {
    // var r = confirm("Are you sure you want to start again from the beginning?")
    // if (r) {
    //     // put code here after testing
    // }
    window.location.reload(false);
    freshGame = 0;
}