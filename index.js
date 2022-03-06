const backButton = document.getElementById("back-arrow");
const forwardButton = document.getElementById("forward-arrow");
const slidesReel = document.getElementById("slides-reel");
const circles = Array.from(document.getElementsByClassName("circle"));
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("start");
const slides = [...document.getElementsByTagName("img")];
let declarationBlock = window.getComputedStyle(slidesReel);
let leftValue = declarationBlock.getPropertyValue("left");
let leftNumber = parseInt(leftValue);

function selectCircle() {
    leftValue = declarationBlock.getPropertyValue("left");
    if (leftValue === "0px") {
        circles[0].classList.add("selected");
        circles[1].classList.remove("selected");
        circles[2].classList.remove("selected");
    }
    else if (leftValue === "-240px") {
        circles[1].classList.add("selected");
        circles[0].classList.remove("selected");
        circles[2].classList.remove("selected");
    }
    else if (leftValue === "-480px") {
        circles[2].classList.add("selected");
        circles[1].classList.remove("selected");
        circles[0].classList.remove("selected");
    }
}

playButton.addEventListener("click", () => {
    slidesReel.classList.add("animated");
    slidesReel.classList.remove("paused");
    setInterval(selectCircle, 10);    
});

pauseButton.addEventListener("click", () => {
    slidesReel.classList.add("paused");
    slidesReel.classList.remove("animated");    
});

backButton.addEventListener("click", () => {
    if (leftNumber < 0) {  
        leftNumber += 240;  
    }
    slidesReel.style.left = leftNumber + "px";
    selectCircle();
});

forwardButton.addEventListener("click", () => {   
    let widthValue = declarationBlock.getPropertyValue("width");
    let widthNumber = Number("-" + parseInt(widthValue));
    let finalNumber = widthNumber + 240;
    if (finalNumber < leftNumber) {  
        leftNumber -= 240;        
    }
    slidesReel.style.left = leftNumber + "px"; 
    selectCircle();   
});

circles.forEach(circle => {
    circle.addEventListener("click", (e) => {
        let circleNo = circle.getAttribute(["data-correspondingImg"]);
        circle.classList.add("selected");
        circles.map(circle => {
            if (circle !== e.target) {
                circle.classList.remove("selected");
            }
        });        
        let position;
        slides.forEach(slide => {
            if (slide.id === circleNo) {
                position = slide.dataset.position;                          
            }
        });
        slidesReel.style.left = Number("-" + position) + "px"; 
    });
});