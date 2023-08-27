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
let index = '';
let frazeAfterGenerating = '';
let someFraze = '';
let ciphertext = '';
let selectedChar = '';
let goodLetter = false;
let wins = 0;
let losses = 0;
let newGame = false;

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

const showHint = () => {
    if (newGame) {
        for (i=0; i < frazesSecondArr.length; i++) {
            let frazeFromSecondArr = frazesSecondArr[i];
            if (someFraze.toUpperCase() === frazeFromSecondArr.toUpperCase()) {
                modal.querySelector('p').textContent = hintsArr[i];
            }
        }

        showHintProcess('block', true);
    }
}

btnHint.addEventListener('click', showHint);

const hideHint = () => showHintProcess('none', false);

btnHideHint.addEventListener('click', hideHint);

const continueGame = () => {
    if (frazes.length === 0) {
        fraze.style.display = 'none';
        result.style.display = 'block';
        result.style.marginTop = '100px';
        result.style.fontSize = '100px';
        result.style.textTransform = 'uppercase';
        result.classList.remove('loss');  
        result.classList.add('win'); 
        result.textContent = `Koniec gry`;
    } else {
    btnPlay.textContent = 'Gram dalej';
    btnPlay.style.display = 'block';
    fraze.textContent = someFraze;
    if (losses === 5) {
    result.style.display = 'block';   
    result.classList.remove('win');  
    result.classList.add('loss');  
    result.textContent = `Niestety nie udało się...`;
    } else {
    result.style.display = 'block';   
    result.classList.remove('loss');  
    result.classList.add('win');  
    result.textContent = `Gratulacje! Udało ci się :)`;
    }
    }
}
// <-
// ------------------------------


const startGame = () => {
    interval = setInterval(timeLapse, 10);
    newGame = true;

    btnPlay.style.display = 'none';
    result.style.display = 'none';
    frazesList.style.display = 'none';
    fraze.style.display = 'block';
    yourLosses.style.display = 'block';
    alphabetPanel.style.display = 'flex';

    losses = 0;
    yourLosses.querySelector('p>span').textContent = losses;
    wins = 0;

    index = Math.floor(Math.random()*frazes.length);

    frazeAfterGenerating = frazes[index];
    someFraze = frazeAfterGenerating.toUpperCase();
    let frazeLength = someFraze.length;

    for (i = 0; i<frazeLength; i++) {
        if (someFraze[i] === ' ') {
            ciphertext += ' ';
            wins++;
        } else if (someFraze[i] === ',') {
            ciphertext += ',';
            wins++;
        } 
        
        else {
            ciphertext += '-';
        }
    }

    fraze.textContent = ciphertext;

    for (i=0; i<alphabet.length; i++) {
        const someLetter = document.createElement('div');
        someLetter.className = 'letter';
        someLetter.dataset.option = i;
        someLetter.textContent = alphabet[i].toUpperCase();
        alphabetPanel.appendChild(someLetter);
    }

    const letters = document.querySelectorAll('div.letter');
    
    letters.forEach(letter => letter.addEventListener('click', function() {
        if (this.dataset.click === 'clicked') return alert('To już odkryto.');
        selectedChar = Number(this.dataset.option);
        searchSomeLetter();
        fraze.textContent = ciphertext;
        this.dataset.click = 'clicked';

        if (goodLetter === true) {
            this.style.backgroundColor = 'green';
            this.style.color = 'white';
        } else {
            losses++;
            gameDataset.allFails++;
            gameData.querySelector('p.allFails>span').textContent = gameDataset.allFails;
            yourLosses.querySelector('p>span').textContent = losses;
            this.style.backgroundColor = 'red';
            this.style.color = 'white';
        }
        

        if (wins === someFraze.length) {
            clearInterval(interval);
            newGame = false;
            gameDataset.yourFrazes++;
            gameData.querySelector('p.yourFrazes>span').textContent = `${gameDataset.yourFrazes}/${frazesSecondArr.length}`;
            yourLosses.style.display = 'none';
            alphabetPanel.style.display = 'none';
            alphabetPanel.textContent = '';
            frazesList.style.display = 'block';
            for (let i=0; i<frazesSecondArr.length; i++) {
                let secondArrFraze = frazesSecondArr[i];
                if (someFraze.toUpperCase() === secondArrFraze.toUpperCase()) {
            ul.querySelector(`li:nth-of-type(${i+1})`).textContent = someFraze;
                }
            }

            frazes.splice(index, 1);

            continueGame();
            ciphertext = '';
            
        }
            
        if (losses === 5) {
            clearInterval(interval);
            newGame = false;
            fraze.textContent = someFraze;
            yourLosses.style.display = 'none';
            alphabetPanel.style.display = 'none';
            alphabetPanel.textContent = '';
            frazesList.style.display = 'block';

            for (let i=0; i<frazesSecondArr.length; i++) {
                let secondArrFraze = frazesSecondArr[i];
                if (someFraze.toUpperCase() === secondArrFraze.toUpperCase()) {
            ul.querySelector(`li:nth-of-type(${i+1})`).textContent = someFraze;
            ul.querySelector(`li:nth-of-type(${i+1})`).style.textDecoration = 'line-through';
                }
            }
    
            frazes.splice(index, 1);

            continueGame();
            ciphertext = '';
        }
        
        goodLetter = false;
    }))
}

btnPlay.addEventListener('click', startGame);

String.prototype.setChar = function(place, char)
    {
    return this.substr(0, place) + char + this.substr(place+1);
    }

function searchSomeLetter (char = alphabet[selectedChar]) {
    for (i=0; i<=someFraze.length; i++) {
        if (char.toUpperCase() === someFraze.charAt(i)) {
            ciphertext = ciphertext.setChar(i, char.toUpperCase());
            goodLetter = true;
            wins++;
            }
        }
    }