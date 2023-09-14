// FOUNDATIONS - FRAZES, HINTS, ALPHABET ETC.
// ->
// ------------------------------
const frazes = [
    'Gdzie kucharek sześć tam nie ma co jeść', 
    'Bez pracy nie ma kołaczy', 
    'Lepszy wróbel w garści niż gołąb na dachu', 
    'Darowanemu koniowi nie patrzy się w zęby', 
    'Gdyby kózka nie skakała, toby nóżki nie złamała', 
    'Gadał dziad do obrazu, a obraz do niego ani razu',
    'Indyk myślał o niedzieli, a w sobotę łeb mu ścięli',
    'Jedna jaskółka wiosny nie czyni',
    'Kto nie ma w głowie, ten ma w nogach',
    'Kto pod kim dołki kopie, ten sam w nie wpada',
];

const frazesSecondArr = [...frazes];

const hintsArr = [
    'Jeśli zbyt wiele osób pracuje nad tą samą rzeczą, tym samym problemem, dublują się ich zadania, to nie odniosą sukcesu.',
    'Żeby coś osiągnąć, trzeba najpierw na to zapracować.',
    'Lepsze coś, co jest niedoskonałe, ale pewne, dostępne niż niedostępny ideał.',
    'Jeśli się coś otrzymało za darmo, zwłaszcza w prezencie, to nie należy tego krytykować, nawet jeśli prezent nie spełnia naszych oczekiwań.',
    'Brak umiaru może doprowadzić do niekorzystnych rezultatów.',
    'Mówić do kogoś na darmo.',
    'Należy robić plany tylko na najbliższą przyszłość.',
    'Nie należy wyciągać pochopnych wniosków na podstawie pojedynczych faktów.',
    'Jeśli ktoś nie ma dobrej pamięci, musi często wracać po to, o czym zapomniał.',
    'Intrygi zwykle obracają się przeciw intrygantowi.',
];

const alphabet = [
    'a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o',
    'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w',
    'x', 'y', 'z', 'ż', 'ź'
];
// <-
// ------------------------------

// BOARDGAME VARIABLES
const fraze = document.querySelector('.fraze');
const result = document.querySelector('.result');
const alphabetPanel = document.querySelector('.alphabetPanel');
const yourLosses = document.querySelector('.yourLosses');

// FRAZES LIST VARIABLES
const frazesList = document.querySelector('.frazesList');
const ul = document.querySelector('div.frazesList>ul');

const btnPlay = document.querySelector('.play');

// HINTS POP-UP PANEL VARIABLES
const btnHint = document.querySelector('.hint');
const btnHideHint = document.querySelector('div.hide');
const modalWrap = document.querySelector('div.modal-wrap');
const modal = document.querySelector('div.modal');

// DEAFAULT VARIABLES
let index = 0;
let frazeAfterGenerating = '';
let frazeAfterGeneratingToUpperCase = '';
let cipherText = '';
let selectedChar = '';
let correctLetter = false;
let correctLettersCounter = 0;
let losses = 0;
let playGame = false;

// FRAZES LIST AT THE BEGINNING (EMPTY LIST)
frazes.forEach(item => {
    const li = document.createElement('li');
    li.textContent = '';
    ul.appendChild(li);
})

// SCOREBOARD
// ->
// ------------------------------
const gameDataset = {
    allFails: 0,
    yourFrazes: 0,
}

// GAME INFO (DATASET) IN HTML PANEL
const gameData = document.querySelector('.gameDataset');
gameData.querySelector('p.allFails>span').textContent = gameDataset.allFails; // Fails span counter
gameData.querySelector('p.yourFrazes>span').textContent = `${gameDataset.yourFrazes}/${frazesSecondArr.length}`; // Finished frazes span counter

const yourTime = document.querySelector('p.yourTime>span'); // Time span counter

let interval = '';
let miliseconds = 0;
let minutes = 0;
let seconds = 0;

const timeLapse = () => {
    miliseconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (miliseconds === 100) {
        miliseconds = 0;
        seconds++;
    }
    // Time counting in text content (yourTime)
    yourTime.textContent = `${minutes<10 ? '0'+minutes : minutes}:${seconds<10 ? '0'+seconds : seconds}:${miliseconds<10 ? '0'+(miliseconds).toFixed() :(miliseconds).toFixed()}`;
}
// <-
// ------------------------------

// HINTS POP-UP
// ->
// ------------------------------
const showHintProcess = (displayParam, method) => {
    modalWrap.style.display = displayParam;
    modal.style.display = displayParam;
    btnHideHint.style.display = displayParam;

    method ? fraze.classList.add('blur') : fraze.classList.remove('blur');
    method ? yourLosses.classList.add('blur') : yourLosses.classList.remove('blur');
    method ? gameData.classList.add('blur') : gameData.classList.remove('blur');
    method ? alphabetPanel.classList.add('blur') : alphabetPanel.classList.remove('blur');
}

// SHOW HINT SECTION
// -->
const showHint = () => {
    if (playGame) {
        for (i=0; i < frazesSecondArr.length; i++) {
            let frazeFromSecondArr = frazesSecondArr[i];
            if (frazeAfterGeneratingToUpperCase.toUpperCase() === frazeFromSecondArr.toUpperCase()) {
                modal.querySelector('p').textContent = hintsArr[i];
            }
        }

        showHintProcess('block', true);
    }
}

btnHint.addEventListener('click', showHint);
// <--

// HIDE HINT SECTION
// -->
const hideHint = () => showHintProcess('none', false);

// BUTTON HINT CLICK LISTENER
btnHideHint.addEventListener('click', hideHint);
// <--

// GAMEPLAY RESULT PROCESS SECTION
// -->
const gameOverProcess = (item1, item2, item3, item4, item5, item6) => {
    // Fraze
    item1.classList.remove('active');
    item1.classList.add('disabled');

    // Result
    item2.classList.remove('win');
    item2.classList.remove('loss');
    item2.classList.add('active');
    item2.classList.add('game-over');

    // Button Play
    item3.classList.remove('active');
    item3.classList.add('disabled');

    // Alphabet panel
    item4.classList.remove('active');
    item4.classList.add('disabled');

    // Frazes list
    item5.classList.remove('disabled');
    item5.classList.add('active');

    // Your Losses
    item6.classList.remove('active');
    item6.classList.add('disabled');

    // Game Over Text Information
    item2.textContent = `koniec gry`;
}

const continueToPlay = (button, item1, item2) => {
    // Button Play Again
    button.classList.remove('disabled');
    button.classList.add('active');
    button.textContent = 'gram dalej';

    // Fraze and SomeFraze - Actual fraze text information
    item1.textContent = item2;
}

const winOrLoss = (item, mistakes) => {
    // item = result, mistakes = losses
    item.classList.remove('disabled');
    item.classList.add('active');

    if (mistakes === 5) { // If you made 5 mistakes
        item.classList.remove('win');  
        item.classList.add('loss');
        item.textContent = 'Niestety nie udało się...';
    } else { // If you guessed you won
        item.classList.remove('loss');  
        item.classList.add('win');  
        item.textContent = `Gratulacje! Udało ci się :)`;
    }
}


// ADD FRAZE TO FRAZES LIST
const addFrazeToList = play => {
    if (play) {
        for (let i=0; i<frazesSecondArr.length; i++) {
            let secondArrFrazeToUpperCase = frazesSecondArr[i].toUpperCase();
            if (frazeAfterGeneratingToUpperCase === secondArrFrazeToUpperCase) {
                ul.querySelector(`li:nth-of-type(${i+1})`).textContent = frazeAfterGeneratingToUpperCase;
                if (losses === 5) ul.querySelector(`li:nth-of-type(${i+1})`).classList.add('loss');
            }
        }
    }

    playGame = false;
}

const gameplayResult = () => {
    if (frazes.length === 0) {
        gameOverProcess(fraze, result, btnPlay, alphabetPanel, frazesList, yourLosses); // Finished game text result
        addFrazeToList(playGame);
    } else {
        continueToPlay(btnPlay, fraze, frazeAfterGeneratingToUpperCase); // Continue game text result
        winOrLoss(result, losses); // Win Process if you guessed or Loss Process if you made 5 mistakes - text result
        enableOrDisableElements(false, playGame);
        addFrazeToList(playGame);
    }
}
// <--
// ------------------------------


// PLAYING GAME PROCESS SECTION
// -->
// ENABLE OR DISABLE ELEMENTS SECTION
// ->
const enableOrDisableElements = (active, play) => {
    // 'active' and 'play' are boolean parameteres in function
    // true = ENABLE, false = DISABLED 
    active ? btnPlay.classList.remove('active') : btnPlay.classList.remove('disabled');
    active ? btnPlay.classList.add('disabled') : btnPlay.classList.add('active');

    active ? result.classList.remove('active') : result.classList.remove('disabled');
    active ? result.classList.add('disabled') : result.classList.add('active');

    active ? frazesList.classList.remove('active') : frazesList.classList.remove('disabled');
    active ? frazesList.classList.add('disabled') : frazesList.classList.add('active');
    
    // Adding fraze to frazes list after winning or loss
    play ? fraze.classList.remove('disabled') : fraze.classList.remove('active');
    play ? fraze.classList.add('active') : fraze.classList.add('disabled');

    active ? yourLosses.classList.remove('disabled') : yourLosses.classList.remove('active');
    active ? yourLosses.classList.add('active') : yourLosses.classList.add('disabled');

    active ? alphabetPanel.classList.remove('disabled') : alphabetPanel.classList.remove('active');
    active ? alphabetPanel.classList.add('active') : alphabetPanel.classList.add('disabled');
    active ? undefined : alphabetPanel.textContent = '';
}
// <-

// SPLICE FRAZES ARRAY AND CLEAR CIPHER TEXT
const clearFrazesAndCipherText = () => {
    frazes.splice(index, 1);
    cipherText = '';
}

// FRAZE GENERATOR
// ->
const frazeGenerator = () => {
    // Generating some fraze from 'frazes' array
    index = Math.floor(Math.random()*frazes.length);
    // Fraze after generating with UPPERCASE
    frazeAfterGenerating = frazes[index];
    frazeAfterGeneratingToUpperCase = frazeAfterGenerating.toUpperCase();
    let frazeLength = frazeAfterGeneratingToUpperCase.length;
    // Generating CIPHER TEXT
    for (i = 0; i < frazeLength; i++) {
        if (frazeAfterGeneratingToUpperCase[i] === ' ') {
            cipherText += ' ';
            correctLettersCounter++;
        } else if (frazeAfterGeneratingToUpperCase[i] === ',') {
            cipherText += ',';
            correctLettersCounter++;
        } 
        
        else {
            cipherText += '-';
        }
    }

    fraze.textContent = cipherText;

    for (i=0; i < alphabet.length; i++) {
        const letter = document.createElement('div');
        letter.className = 'letter';
        letter.dataset.option = i;
        letter.textContent = alphabet[i].toUpperCase();
        alphabetPanel.appendChild(letter);
    }
}
// <-

// CHECKING WIN OR LOSS FUNCTION
// -->
const checkWinOrLossFunc = () => {
    // WIN / VICTORY PROCESS
    // ->
    if (correctLettersCounter === frazeAfterGeneratingToUpperCase.length) {
        clearInterval(interval);
        clearFrazesAndCipherText();
        gameplayResult();

        gameDataset.yourFrazes++;
        // Guessed frazes / All frazes (COUNTER)
        gameData.querySelector('p.yourFrazes>span').textContent = `${gameDataset.yourFrazes}/${frazesSecondArr.length}`; 
    }
    // <-
        
    // LOSS PROCESS (AFTER 5 MISTAKES)
    // ->
    if (losses === 5) {
        clearInterval(interval);
        clearFrazesAndCipherText();

        console.log(frazes.length);
        gameplayResult();

        fraze.textContent = frazeAfterGeneratingToUpperCase;
    }
    // <-
}
// <--

// CORRECT OR INCORRECT LETTER FUNCTION
// ->
function correctOrMistake(letter) {
    if (letter === true) {
        this.classList.add('correct');
    } else {
        losses++;
        console.log('błąd')
        gameDataset.allFails++;
        gameData.querySelector('p.allFails>span').textContent = gameDataset.allFails;
        yourLosses.querySelector('p>span').textContent = losses;
        this.classList.add('mistake');
    }

    
}
// <-

// LETTERS CLICK LISTENER
// ->
const letterClickingProcesses = () => {
    const letters = document.querySelectorAll('div.letter');
    
    letters.forEach(letter => letter.addEventListener('click', function() {
        if (this.dataset.click === 'clicked') return alert('To już odkryto.');

        selectedChar = Number(this.dataset.option);
        searchSomeLetter();
        fraze.textContent = cipherText;
        this.dataset.click = 'clicked';

        // Check if clicked letter is correct
        const correctOrMistakeBind = correctOrMistake.bind(this, correctLetter);
        correctOrMistakeBind();
        checkWinOrLossFunc();
        correctLetter = false;
    }))
}
// <-

// PLAYING GAME PROCESS FUNCTION
// ->
const playGameProcess = () => {
    // START GAME
    interval = setInterval(timeLapse, 10);
    playGame = true;
    enableOrDisableElements(true, playGame); // Enable elements

    // Restarting mistakes and correct letters counter to zero
    losses = 0;
    yourLosses.querySelector('p>span').textContent = losses;
    correctLettersCounter = 0;

    frazeGenerator(); // Generating fraze and cipher text...

    letterClickingProcesses(); // Letter click listeners, letters processes and win or loss processes
}

// BUTTON PLAY CLICK LISTENER
btnPlay.addEventListener('click', playGameProcess);
// <-
// <--

// REPLACING CHAR FUNCTION FOR CIPHER TEXT
// ->
String.prototype.setChar = function(place, char) {
    return this.substr(0, place) + char + this.substr(place + 1);
}
// <-

// COMPARING LETTER FROM ALPHABET PANEL TO CHAR FROM GENERATED FRAZE 
// ->
function searchSomeLetter (char = alphabet[selectedChar].toUpperCase()) {
    for (i=0; i <= frazeAfterGeneratingToUpperCase.length; i++) {
        const charAtFraze = frazeAfterGeneratingToUpperCase.charAt(i);

        if (char === charAtFraze) {
            cipherText = cipherText.setChar(i, char);
            correctLetter = true;
            correctLettersCounter++;
            }
        }
    }
// <-