const backButton = document.getElementById("back-arrow");
const forwardButton = document.getElementById("forward-arrow");
const slidesReel = document.getElementById("slides-reel");
const circles = Array.from(document.getElementsByClassName("circle"));
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("start");
//const slides = [...document.getElementsByTagName("img")];
const slides = [...document.getElementsByClassName("segment")];
const image1 = slides[0];
const controlButtons = document.querySelectorAll("#controls-inner button");
let reelDeclarationBlock = window.getComputedStyle(slidesReel);
let leftValue = reelDeclarationBlock.getPropertyValue("left");
let leftNumber = parseInt(leftValue);
let imageDeclarationBlock = window.getComputedStyle(image1);
let imageWidth = parseInt(imageDeclarationBlock.getPropertyValue("width"));

for (let i = 0; i < slides.length; i++) {
    slides[i].setAttribute("data-position", -(imageWidth * i) + "px");    
}

function findVisibleSlide() {
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].dataset.position === leftValue) {
            slides[i].classList.add("visible");
        }
        else slides[i].classList.remove("visible");
    }    
}

// rewrite this with cirle indices matching imageWidth multipliers:

function selectCircle() {
    leftValue = reelDeclarationBlock.getPropertyValue("left");
    for (let i = 0; i < circles.length; i++) {
        if (leftValue === -(imageWidth * i) + "px") {
            circles[i].classList.add("selected");
        }
        else circles[i].classList.remove("selected");
    }          
}

playButton.addEventListener("click", () => {
    slidesReel.classList.add("animated");
    slidesReel.classList.remove("paused");
    setInterval(selectCircle, 10);
    setInterval(findVisibleSlide, 10);    
});

pauseButton.addEventListener("click", () => {
    slidesReel.classList.add("paused");
    slidesReel.classList.remove("animated");    
});

backButton.addEventListener("click", () => {
    leftValue = reelDeclarationBlock.getPropertyValue("left");
    leftNumber = parseInt(leftValue);
    if (leftNumber < -0) {  
        leftNumber += imageWidth;  
    }
    slidesReel.style.left = leftNumber + "px";
    selectCircle();
    findVisibleSlide();
});

forwardButton.addEventListener("click", () => {   
    let widthValue = reelDeclarationBlock.getPropertyValue("width");
    let widthNumber = Number("-" + parseInt(widthValue));
    leftValue = reelDeclarationBlock.getPropertyValue("left");
    leftNumber = parseInt(leftValue);
    let finalNumber = widthNumber + imageWidth;// 2000 + 500
    if (finalNumber < leftNumber) {  
        leftNumber -= imageWidth;        
    }
    slidesReel.style.left = leftNumber + "px"; 
    selectCircle();   
    findVisibleSlide();
});
controlButtons.forEach(button => {
    console.log({button});
    button.addEventListener("click", (e) => {
        let clickedButton = e.target;
        let controlsInner = clickedButton.closest("#controls-inner");
        controlsInner.classList.toggle("clicked");          
        if (clickedButton.id == "pause") {
           console.log("paused");
           controlsInner.classList.add("paused");
        }
        else controlsInner.classList.remove("paused");              
    });
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
                slide.classList.add("visible");                         
            }
            else slide.classList.remove("visible");
        });
        slidesReel.style.left = position;        
    });
});