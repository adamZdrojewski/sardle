//Constants
const numberKeys = document.getElementsByClassName("numberKey");

//Vars
let answerNum = [];
let styleArr = [];
let guesses = [];
let currentGuess = "";

//Page Setup
getAnswerNum();
setupStyleArr();
renderGrid();

//Event Listeners
document.addEventListener("keydown", (e) => {
    if(e.keyCode == 8 && currentGuess.length != 0) {
        //Backspace
        e.preventDefault();
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    } else if(e.keyCode == 13) {
        //Enter
        e.preventDefault();
        submitGuess();
    }
    if(currentGuess.length >= 5) {
        //Guess Is Already 5 Numbers
        e.preventDefault();
        return;
    }
    if(e.keyCode == 48 || e.keyCode == 96) {
        e.preventDefault();
        currentGuess = currentGuess + "0";
    } else if(e.keyCode == 49 || e.keyCode == 97) {
        e.preventDefault();
        currentGuess = currentGuess + "1";
    } else if(e.keyCode == 50 || e.keyCode == 98) {
        e.preventDefault();
        currentGuess = currentGuess + "2";
    } else if(e.keyCode == 51 || e.keyCode == 99) {
        e.preventDefault();
        currentGuess = currentGuess + "3";
    } else if(e.keyCode == 52 || e.keyCode == 100) {
        e.preventDefault();
        currentGuess = currentGuess + "4";
    } else if(e.keyCode == 53 || e.keyCode == 101) {
        e.preventDefault();
        currentGuess = currentGuess + "5";
    } else if(e.keyCode == 54 || e.keyCode == 102) {
        e.preventDefault();
        currentGuess = currentGuess + "6";
    } else if(e.keyCode == 55 || e.keyCode == 103) {
        e.preventDefault();
        currentGuess = currentGuess + "7";
    } else if(e.keyCode == 56 || e.keyCode == 104) {
        e.preventDefault();
        currentGuess = currentGuess + "8";
    } else if(e.keyCode == 57 || e.keyCode == 105) {
        e.preventDefault();
        currentGuess = currentGuess + "9";
    }
    renderGrid();
});

for(var i = 0; i < numberKeys.length; i++) {
    numberKeys[i].addEventListener("click", (e) => {
        if(e.target.innerHTML == "Del" && currentGuess.length != 0) {
            currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        } else if(e.target.innerHTML == "0") {
            currentGuess = currentGuess + "0";
        } else if(e.target.innerHTML == "1") {
            currentGuess = currentGuess + "1";
        } else if(e.target.innerHTML == "2") {
            currentGuess = currentGuess + "2";
        } else if(e.target.innerHTML == "3") {
            currentGuess = currentGuess + "3";
        } else if(e.target.innerHTML == "4") {
            currentGuess = currentGuess + "4";
        } else if(e.target.innerHTML == "5") {
            currentGuess = currentGuess + "5";
        } else if(e.target.innerHTML == "6") {
            currentGuess = currentGuess + "6";
        } else if(e.target.innerHTML == "7") {
            currentGuess = currentGuess + "7";
        } else if(e.target.innerHTML == "8") {
            currentGuess = currentGuess + "8";
        } else if(e.target.innerHTML == "9") {
            currentGuess = currentGuess + "9";
        } else if(e.target.innerHTML == "Enter") {
            submitGuess();
        }
        renderGrid();
    });
}

//Functions
function getRandNum(l, h) {
	h++;
	var finalNum = Math.floor(Math.random() * (h - l)) + l;
	return(finalNum);
}

function getAnswerNum() {
    for(var i = 0; i < 5; i++) {
        if(i == 0) {
            //First Number Can't Be 0
            answerNum[i] = getRandNum(1, 9);
        } else {
            //All Other Numbers Can Be 0-9
            answerNum[i] = getRandNum(0, 9);
        }
    }
}

function setupStyleArr() {
    for(var i = 0; i < 6; i++) {
        var tempArr = [];
        for(var g = 0; g < 5; g++) {
            tempArr.push("empty");
        }
        styleArr.push(tempArr);
    }
}

function renderGrid() {
    //Set Styles
    for(var i = 0; i < styleArr.length; i++) {
        for(var g = 0; g < styleArr[i].length; g++) {
            var tempElement = document.querySelector(`#tile${i}${g}`);
            if(styleArr[i][g] == "empty") {
                tempElement.setAttribute("class", "tile empty");
            } else if(styleArr[i][g] == "wrong") {
                tempElement.setAttribute("class", "tile wrong");
            } else if(styleArr[i][g] == "almost") {
                tempElement.setAttribute("class", "tile almost");
            } else if(styleArr[i][g] == "right") {
                tempElement.setAttribute("class", "tile right");
            }
        }
    }

    //Set Numbers
    for(var i = 0; i < 6; i++) {
        for(var g = 0; g < 5; g++) {
            if(i < guesses.length) {
                //Previous Guess
                document.querySelector(`#tile${i}${g}`).innerHTML = guesses[i].split("")[g];
            } else if(i == guesses.length) {
                //Current Guess
                if(currentGuess.split("")[g]) {
                    document.querySelector(`#tile${i}${g}`).innerHTML = currentGuess.split("")[g];
                } else {
                    document.querySelector(`#tile${i}${g}`).innerHTML = "&#8203;";
                }
            } else {
                //Not Used Yet
                document.querySelector(`#tile${i}${g}`).innerHTML = "&#8203;";
            }
        }
    }
}

function submitGuess() {
    //Check If Player Lost
    if(guesses.length == 6) {
        alert("Sorry, better luck next time\nThe number was " + answerNum.join("") + "\n\nTo try again, refresh the page!");
        return;
    }
    //Make Sure Guess Is 5 Digits
    if(currentGuess.length != 5) {
        alert("Number Is 5 Digits Long");
        return;
    }
    var currentGuessArr = currentGuess.split("");
    //Check Digits
    for(var i = 0; i < currentGuessArr.length; i++) {
        if(currentGuessArr[i] == answerNum[i]) {
            //Right
            styleArr[guesses.length][i] = "right";
        } else if(answerNum.includes(parseInt(currentGuessArr[i]))) {
            //Almost
            styleArr[guesses.length][i] = "almost";
        } else {
            //Wrong
            styleArr[guesses.length][i] = "wrong";
        }
    }
    //Check For All Right
    if(currentGuess == answerNum.join("")) {
        setTimeout(() => {
            alert(`You got it in ${guesses.length} tries!\nWould you like to play again?`);
            location.reload();
        }, 500);
    }
    guesses.push(currentGuess);
    currentGuess = "";
    renderGrid();
    //Check If Player Lost
    if(guesses.length == 6) {
        setTimeout(() => {
            alert("Sorry, better luck next time\nThe number was " + answerNum.join("") + "\n\nTo try again, refresh the page!");
        }, 500);
    }
}