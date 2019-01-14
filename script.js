var word = "";
var easyWords = ["ball", "phone", "then", "have", "label", "book", "good"];
var mediumWords = ["waffle", "brick", "stamp", "grenade", "octopus", "hangman"];
var hardWords = ["awkward", "banjo", "dwarf", "bookkeeper", "handkerchief"];
var guesses = 6;
var guessedLetters = [];
var allLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var trueFalse = [];
var places = [];

function addLetters(){
    var result = "<option value='" + 0 + "'>" + "choose a letter" + "</option>";
    for(var i = 0; i < 26; i++){
        if(guessedLetters.indexOf(allLetters[i]) == -1){
            result += "<option value='" + (i + 1) + "'>" + allLetters[i] + "</option>";
        }
        document.getElementById("letter").innerHTML = result;
    }
}

function startGame(){
    document.getElementById("guessedLetters").innerHTML = "";
    word = "";
    document.getElementById("wonOrLost").innerHTML = "";
    guessedLetters = [];
    guesses = 6;
    addLetters();
    document.getElementById("word").innerHTML = "";
    var level = document.getElementById("level").value;
    if(level == 1){
        word = easyWords[Math.floor(Math.random() * easyWords.length)];
    }
    if(level == 2){
        word = mediumWords[Math.floor(Math.random() * mediumWords.length)];
    }
    if(level == 3){
        word = hardWords[Math.floor(Math.random() * hardWords.length)];
    }
    console.log(word);
    console.log(guessedLetters);
    printWord();
}


function printWord(){
    places.length = 0;
    console.log(word);
    console.log(guessedLetters);

    var answer = "";

    for(var i = 0; i <word.length; i++){
        if(guessedLetters.indexOf(word[i]) > -1){
            answer += word[i];
        }else{
            answer += "_ ";
            trueFalse[i] = false;
        }
    }
    document.getElementById("guesses").innerHTML = guesses;
    console.log(answer);
    document.getElementById("word").innerHTML = answer;

    return answer;
}



function guessLetter() {
    if (guesses == 0) {
        return;
    }
    var guess = document.getElementById("letter").value;
    guess = parseInt(guess) - 1;
    var letter = allLetters[guess];
    guessedLetters.push(letter);
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    console.log(letter);
    if (word.indexOf(letter) == -1) {
        guesses--;
        if (guesses == 0) {
            document.getElementById("wonOrLost").innerHTML = "You lost! Try again.";
        }
        document.getElementById("guessedLetters").innerHTML = guessedLetters;
        document.getElementById("guesses").innerHTML = guesses;
    } else {
        var change = word;
        var x;
        var y = 0;
        while ((x = change.indexOf(letter)) > -1) {
            places[x + y] = letter;
            trueFalse[x + y] = true;
            change = change.substring(x + 1);
            y += x + 1;
        }
        var temp = "";
        for (var i = 1; i < places.length; i++) {
            temp += places[i];
        }

        var found = true;
        for (var i = 0; i < word.length && found; i++) {
            if (trueFalse[i] == false) {
                found = false;
            }
        }
        if (found == true) {
            document.getElementById("wonOrLost").innerHTML = "You Won!!";
        }

        document.getElementById("word").innerHTML = temp;
        console.log(temp);
    }
    addLetters();
    var answer = printWord();
    document.getElementById("word").value = 0;
}
