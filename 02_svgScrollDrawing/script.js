"use strict"

let oldPosX = [0,0,0];
let oldPosY = [0,0,0];
let newPosX = [0,0,0];
let newPosY = [0,0,0];
let posDiffX = [0,0,0];
let posDiffY = [0,0,0];
let bloomFlag = false;

function setOffset() {
    function setPath(count) {
        let path1 = document.getElementsByClassName("stemOuter")[count];
        let path2 = document.getElementsByClassName("stemInner")[count];
        let budContainer = document.getElementById(`budContainer${count}`);
        let flowerContainer = document.getElementById(`flowerContainer${count}`);
        let bud = document.getElementById(`bud${count}`);
        let flower = document.getElementById(`flower${count}`);

        path1.style.strokeDasharray = path1.getTotalLength();
        path1.style.strokeDashoffset = (path1.getTotalLength() - (path1.getTotalLength() * (effectPercent - 100))).toString();
        path2.style.strokeDasharray = path2.getTotalLength();
        path2.style.strokeDashoffset = (path2.getTotalLength() - (path2.getTotalLength() * (effectPercent - 100))).toString();
        bud.style.width = `${(initialWidth/maxRatio)*scaleRatio}px`;
        bud.style.height = `${(initialHeight/maxRatio)*scaleRatio}px`;
        flower.style.width = `${(initialWidth/maxRatio)*scaleRatio}px`;
        flower.style.height = `${(initialHeight/maxRatio)*scaleRatio}px`;

        let currentPoint = path1.getPointAtLength(effectPercent*path1.getTotalLength());
        newPosX[count] = currentPoint.x;
        newPosY[count] = currentPoint.y;
        posDiffX[count] = newPosX[count] - oldPosX[count];
        posDiffY[count] = newPosY[count] - oldPosY[count];
        oldPosX[count] = newPosX[count];
        oldPosY[count] = newPosY[count];
        let rotateValue = Math.atan(posDiffY[count]/posDiffX[count])*(180/Math.PI);
        if (rotateValue > 0){
            rotateValue -= 180;
        }

        if (effectPercent >= 1 && !bloomFlag){
            bloomFlag = true;
        } else if (effectPercent < 1 && bloomFlag){
            bloomFlag = false;
        }
        if (bloomFlag){
            bud.style.transform = "scale(0) rotate(275deg)";
            bud.style.transform = "scale(0) rotate(275deg)";
            flower.style.transform = "scale(2) rotate(275deg)";
            flower.style.transform = "scale(2) rotate(275deg)";
        } else {
            bud.style.transform = "scale(1) rotate(275deg)";
            bud.style.transform = "scale(1) rotate(275deg)";
            flower.style.transform = "scale(0) rotate(275deg)";
            flower.style.transform = "scale(0) rotate(275deg)";
        }

        budContainer.style.transform = `rotate(${rotateValue}deg)`;
        flowerContainer.style.transform = `rotate(${rotateValue}deg)`;
        budContainer.style.left = `${(currentPoint.x*scaleRatio) - ((offsetX/maxRatio)*-scaleRatio) + sidePadding}px`;
        flowerContainer.style.left = `${(currentPoint.x*scaleRatio) - ((offsetX/maxRatio)*-scaleRatio) + sidePadding}px`;
        budContainer.style.top = `${(currentPoint.y*scaleRatio) - ((offsetY/maxRatio)*-scaleRatio)}px`;
        flowerContainer.style.top = `${(currentPoint.y*scaleRatio) - ((offsetY/maxRatio)*-scaleRatio)}px`; 
    }

    let svgWidth = document.getElementById("svgWindow").getAttribute("viewBox").split(" ")[2];
    let centerWidth = 1000;
    let sidePadding = 0;
    let maxRatio = centerWidth / svgWidth;
    let scaleRatio = 1;
    if (document.body.clientWidth < 1000){
        centerWidth = document.body.clientWidth;
        sidePadding = 0;
    } else {
        centerWidth = 1000;
        sidePadding = (document.body.clientWidth - 1000) / 2;
    }
    let dimRatio = centerWidth / document.documentElement.clientHeight;
    let dimScaling = (Math.log(dimRatio)/4) + 0.88;
    if (dimScaling > 0.88){
        dimScaling = 0.88;
    }
    scaleRatio = centerWidth / svgWidth;
    let effectPercent = (scrollY/(document.body.scrollHeight - document.body.offsetHeight)/(dimScaling));
    let initialWidth = 150;
    let initialHeight = 150;
    let offsetX = -75;
    let offsetY = -75;
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    let output = document.getElementsByClassName("data");
    output[0].textContent = `effectPercent: ${effectPercent*100}%`;
    output[1].textContent = `centerWidth: ${centerWidth}`
    output[2].textContent = `svgWidth: ${svgWidth}`
    output[3].textContent = `maxRatio: ${maxRatio}`
    output[4].textContent = `scaleRatio: ${scaleRatio}`
    output[5].textContent = `winWidth: ${winWidth}`
    output[6].textContent = `winHeight: ${winHeight}`

    for (let i=0; i < 3; i++){
        setPath(i);
    }
}

function init(){
    if (window.addEventListener){
        window.addEventListener("scroll", setOffset, false);
        window.addEventListener("resize", setOffset, false);
    } else if (window.attachEvent) {
        window.attachEvent("onscroll", setOffset);
        window.attachEvent("onresize", setOffset);
    }
    setOffset();
    document.getElementById("scriptCheck").remove();
}

if (window.addEventListener){
    window.addEventListener("load", init, false);
}

else if (window.attachEvent) {
    window.attachEvent("onload", init);
}