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

playButton.addEventListener("click", () => {
    slidesReel.classList.add("animated");
    slidesReel.classList.remove("paused");
    console.log("animated");
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
});

forwardButton.addEventListener("click", () => {   
    let widthValue = declarationBlock.getPropertyValue("width");
    let widthNumber = Number("-" + parseInt(widthValue));
    let finalNumber = widthNumber + 240;
    if (finalNumber < leftNumber) {  
        leftNumber -= 240;        
    }
    slidesReel.style.left = leftNumber + "px";    
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
        console.log(circleNo);
        let position;
        slides.forEach(slide => {
            if (slide.id === circleNo) {
                position = slide.dataset.position;
                console.log({position});            
            }
        });
        slidesReel.style.left = Number("-" + position) + "px"; 
    });
});


