import {dogsData} from "./data.js"
import {Dog} from "./Dog.js"


let currentDogIndex = 0
const lastDogAvailableIndex = dogsData.length - 1
let currentDog = new Dog(dogsData[currentDogIndex])
const acceptButton = document.getElementById("accept-button")
const rejectButton = document.getElementById("reject-button")

acceptButton.addEventListener('click', yes)
rejectButton.addEventListener('click', no)


function render() {
    document.getElementById('card').innerHTML = currentDog.getDogHtml()
}

function getNewDog() {
    if (currentDogIndex !== lastDogAvailableIndex) {
        currentDogIndex+=1
        currentDog = new Dog(dogsData[currentDogIndex])
        render()
    } else {
        lastDogReached()
    }
}

function lastDogReached() {
        document.getElementById('card').innerHTML = `
            <div class="card-end-message">
                <h4>There are no more dogs available in your area 😢</h4>
                <h5>You can try again in a few minutes or go back to the start now.</h5>
                <button id="restart-btn">Start again</button>
            </div>
            `
        acceptButton.style.display = "none"
        rejectButton.style.display = "none"
        
        document.getElementById("restart-btn").addEventListener('click', () => {
            currentDogIndex = 0
            currentDog = new Dog(dogsData[currentDogIndex])
            acceptButton.style.display = "block"
            rejectButton.style.display = "block"
            render()
        })
}

function yes() {
    currentDog.setMatchStatus(true)
    document.getElementById('badge-img').innerHTML = `
            <img class="badge" src="images/badge-like.png">`
    setTimeout(() => { 
            getNewDog()
            }, 1000)
}

function no() {
    currentDog.setMatchStatus(false)
    document.getElementById('badge-img').innerHTML = `
            <img class="badge" src="images/badge-nope.png">`
    setTimeout(() => {
         getNewDog()
        }, 1000)
}


render()