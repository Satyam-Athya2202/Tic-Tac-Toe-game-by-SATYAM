let bgMusic = new Audio("Music.mp3")
let turnMusic = new Audio("ting.mp3")
let gameOverMusic = new Audio("gameover.mp3")

let showTurn = document.querySelector(".showTurn")
let whoWon = document.querySelector(".whoWon")

let resetBtn = document.querySelector("button")



// for play and off the BG music...





let onOffMusic = document.querySelector(".on-off-music");

onOffMusic.addEventListener("click", (e) => {
    

    if (bgMusic.paused) {
        bgMusic.currentTime = 0;
        bgMusic.play();
        bgMusic.volume = 0.5;
        onOffMusic.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
    else {
        bgMusic.pause();
        onOffMusic.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }
});







//Function for turning Sides
let currentTurn = "X"
const changeTurn = () => {

    return currentTurn === "X" ? "O" : "X";
}




let Boxes = document.querySelectorAll(".small-box")

Array.from(Boxes).forEach(elem => {

    let boxText = elem.querySelector(".boxText")// it will select the text inside of that particular elem.

    elem.addEventListener("click", () => {


        if (boxText.innerText === "") {
            boxText.innerText = currentTurn;
        }

        if (boxText.innerText === "X") {
            boxText.style.color = "red";
            showTurn.innerText = "O"
        }

        if (boxText.innerText === "O") {
            boxText.style.color = "cyan";
            showTurn.innerText = "X"
        }
        currentTurn = changeTurn();
        turnMusic.currentTime = 0; // Reset audio to start, currentTime defines the current playback time 
        turnMusic.volume = .3
        turnMusic.play()
        checkkWin()




    })

})


//Function to check win!!!

const checkkWin = () => {
    let boxText = document.getElementsByClassName("boxText")
    let winArray = [
        [0, 3, 6],
        [0, 4, 8],
        [0, 1, 2],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]

    winArray.forEach(elem => {
        if (
            (boxText[elem[0]].innerText !== "") &&
            (boxText[elem[0]].innerText === boxText[elem[1]].innerText) &&
            (boxText[elem[2]].innerText === boxText[elem[1]].innerText)
        ) {
            
            document.querySelector(".thisWon").innerText = boxText[elem[0]].innerText;
            whoWon.style.opacity = 1
            gameOverMusic.play()
            disableClicks();
            wonAnimation(boxText[elem[0]], boxText[elem[1]], boxText[elem[2]])
            
        }
    })

}
//here what is happening is that suppose we click on middle box then winnarray function get called then what is does it iterates from every win possibility and check if that win possibility have same inner text if yes then it declares a  win,



const disableClicks = () => {
    Boxes.forEach(elem => {
        elem.style.pointerEvents = "none"
    })
};



let mainBox = document.querySelector('.main-box')
const wonAnimation = (a, b, c) => {

    //   transform: scale(2.5) rotate(180deg);
    // transition: all ease .5s;

    mainBox.style.transform = "skewX(0deg)"
    mainBox.style.transition = "all ease-in-out .6s"

    a.classList.add("wonAnimation");
    a.parentNode.style.backgroundColor = "rgba(255, 255, 255, 0.36)"
   

    b.classList.add("wonAnimation");
    b.parentNode.style.backgroundColor = "rgba(255, 255, 255, 0.36)"
   

    c.classList.add("wonAnimation");
    c.parentNode.style.backgroundColor = "rgba(255, 255, 255, 0.36)"
  
}

// function to reset the game 
const resetGame = () => { // a,b,c for annimation background

    Boxes.forEach(elem => {
        let boxText = elem.querySelector(".boxText");
        boxText.innerText = ""; // Clear text
        boxText.style.fontSize = "24px"; // Reset font size
        elem.style.pointerEvents = "auto"; // Enable clicking again
        elem.style.backgroundColor = "transparent"; // Reset background
        elem.style.transition = "all ease .7s"; 
        boxText.classList.remove("wonAnimation");
       
    });
    
    
    mainBox.style.transform="skewX(-10deg)" 
    whoWon.style.opacity = 0;
    currentTurn = "X" // it basically reset the turn value to X
    showTurn.innerText = "X"

}
resetBtn.addEventListener("click", resetGame);

