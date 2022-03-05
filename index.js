const backButton = document.getElementById("back-arrow");
const forwardButton = document.getElementById("forward-arrow");
const slidesReel = document.getElementById("slides-reel");
const circles = Array.from(document.getElementsByClassName("circle"));

backButton.addEventListener("click", () => {   
    let declarationBlock = window.getComputedStyle(slidesReel);
    let leftValue = declarationBlock.getPropertyValue("left");
    console.log({declarationBlock});
    console.log({leftValue});  
    console.log(parseInt(leftValue));
    let leftNumber = parseInt(leftValue);
    if (leftNumber < 0) {  
        leftNumber += 240;
        console.log({leftNumber});
        slidesReel.style.left = leftNumber + "px";
    }
});

