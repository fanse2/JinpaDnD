const playButton = document.querySelector('.play-button')
const master = document.querySelector('#master')
const hellga = document.querySelector('#hellga')
const connal = document.querySelector('#connal')

const masterLine = [
    '때는 30세기 무렵, 진파계는 혼돈에 빠졌다.',
    '헬가대령은 꼰날장군의 게릴라부대를 요격하기 위해 출정.',
    '드랍쉽이 자기장덫에 잡히고 암호를 모르면 공격을 당하게 된다',
    '포스가 함께하시길~!'
]

const connalLine = [
    '케찰 지역을 접수하라!',
    '진격하라~!'
]

const hellgaLine = [
    '드랍쉬의 지원이 오고 있다.',
    '지옥의 빨간맛을 보여주마!'
]

let maxLine = masterLine.length
let storyInt

function pitchLine(sentence,playerCard) {
    let line

    playerCard.childNodes.forEach(el=>{
        if(el.className == 'line'){
            el.remove()
        } 
    })

    const newLine = document.createElement('div')
    newLine.classList.add('line')
    newLine.textContent = sentence
    playerCard.appendChild(newLine)

}

async function story() {
    // Master saying
    let masterPromise = new Promise(resolve => {
        pitchLine(masterLine.shift(),master)
        storyInt = setInterval(nextLine,3000,masterLine,master)
        setTimeout(function() {resolve("flex");}, 12000);
    })


    // Connal saying
    connal.style.display = await masterPromise
    let connalPromise = new Promise(resolve => {
        pitchLine(connalLine.shift(),connal)
        storyInt = setInterval(nextLine,3000,connalLine,connal)
        setTimeout(function() {resolve("flex");}, 6500);
    })

    // Hellga saying
    hellga.style.display = await connalPromise
    let hellgaPromise = new Promise(resolve => {
        pitchLine(connalLine.shift(),hellga)
        storyInt = setInterval(nextLine,3000,hellgaLine,hellga)
        setTimeout(function() {resolve("flex");}, 11000);
    })


}

function nextLine(lines,playerCard) {
    let sentence = lines.shift()

    if(sentence) {
        pitchLine(sentence,playerCard)
        console.log(playerCard)
    } else {
        clearInterval(storyInt)
    }

}

playButton.addEventListener('click',story)

let answers = [
    'tiger',
    'lion',
    'crocodile',
    'dolphin',
    'elephant',
    'barracuda',
    'gorilla',
    'toad',
    'coyote',
    'iguana',
    'whale',
    'orangutan',
    'peacock',
    'chameleon',
    'turkey',
    'cheetah',
    'armadillo',
    'bonobo',
    'camel',
    'shark'
]

let answer = ''
let maxWrong = 6
let mistakes = 0
let guessed = []
let wordStatus = null


function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
    document.querySelector('#' + chosenLetter).setAttribute('disabled', true)


    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord()
        checkIfGameWon()
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++
        updateMistakes()
        checkIfGameLost()
        updateHangmanPicture()
    }
}

function randomWord() {
    answer = answers[Math.floor(Math.random()*answers.length)]
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `
    <button
        class='letter-button' id='${letter}' onClick='handleGuess("${letter}")'>
        ${letter}
    </button>
    `).join('')
    document.querySelector('#keyboard').innerHTML = buttonsHTML
}


function updateHangmanPicture() {
    document.querySelector('#hangmanPic').src = `./images/SCDropship${mistakes}.jpg`
}

function checkIfGameWon() {
    if(wordStatus === answer) {
        document.querySelector('#wordSpotlight').innerHTML = '드랍쉽이 덫에서 벗어나고 병력투하, 작전성공!'
        document.querySelector('#keyboard').innerHTML = ''
    }
}


function checkIfGameLost() {
    if(mistakes === maxWrong) {
        document.querySelector('#wordSpotlight').innerHTML = '비밀번호는 ' + answer + ' => 실패'
        document.querySelector('#keyboard').innerHTML = ''
    }
}

function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('')
    document.querySelector('#wordSpotlight').innerHTML = wordStatus
}

function updateMistakes() {
    document.querySelector('#mistakes').innerHTML = mistakes
}

function reset(){
    mistakes = 0
    guessed = []
    document.querySelector('#hangmanPic').src = './images/SCDropship0.jpg'
    randomWord()
    guessedWord()
    updateMistakes()
    generateButtons()
}

document.querySelector('#maxWrong').innerHTML = maxWrong
randomWord()
generateButtons()
guessedWord()
story()