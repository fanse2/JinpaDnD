const playButton = document.querySelector('.play-button')
const master = document.querySelector('#master')
const hellga = document.querySelector('#hellga')
const connal = document.querySelector('#connal')

const masterLine = [
    '때는 30세기 무렵, 진파계는 혼돈에 빠졌다.',
    '헬가대령은 꼰날 장군의 게릴라 부대를 요격하기 위해 출정 하였다.',
    '주사위를 굴려서 장기의 말 처럼 이동하여 공략한다.',
    '포스가 함께하시길~!'
]

const connalLine = [
    '좌표 33,25 지역을 접수하라!',
    '진격하라~!'
]

const hellgaLine = [
    '한명의 해방군도 허용치마라',
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
        setTimeout(function() {resolve("flex");}, 10000);
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