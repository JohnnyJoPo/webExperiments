"use strict"

var wheelCount = 1;
const amountIn = document.getElementById("amountIn");
const updateBtn = document.getElementById("updateBtn");

function setValues() {
    let scrollAmount = window.scrollY
    let maxScrollAmount = window.scrollMaxY
    let scrollPercent = (scrollAmount/maxScrollAmount)*100;
    let winWidth = window.innerWidth
    let winHeight = window.innerHeight
    let wheelSize = document.getElementById("wheelContainer").offsetWidth;
    let boxSize = document.getElementById("wheel0").offsetWidth;
    let boxScale = 100-(100*(boxSize/wheelSize))
    let output = [];
    let slider = [];
    let wheel = [];
    for(let i=0; i<5; i+=1){
        output[i] = document.getElementById(`data${i}`);
    }
    for(let i=0; i<6; i+=1){
        slider[i] = document.getElementById(`slider${i}`);
    }
    for(let i=0; i<wheelCount; i+=1){
        wheel[i] = document.getElementById(`wheel${i}`);
    }
    output[0].textContent = `Scroll: ${scrollAmount}`;
    output[1].textContent = `Max Scroll: ${maxScrollAmount}`;
    output[2].textContent = `Scroll Percent: ${scrollPercent}%`;
    output[3].textContent = `Win. Width: ${winWidth}px`;
    output[4].textContent = `Win. Height: ${winHeight}px`;

    slider[0].style.width = scrollPercent.toString() + "%";
    slider[1].style.width = (scrollPercent/2).toString() + "%";
    slider[2].style.marginLeft = scrollPercent.toString() + "%";
    slider[3].style.marginLeft = ((-Math.abs(scrollPercent-50)+50)*2).toString() + "%";
    slider[4].style.marginLeft = ((-Math.abs(-Math.abs(scrollPercent-(200/3))+(100/3))+(100/3))*3).toString() + "%";
    slider[5].style.marginLeft = ((-Math.abs(-Math.abs(scrollPercent-50)+25)+25)*4).toString() + "%";
    for(let i=0; i<wheelCount; i+=1){
        wheel[i].style.left = ((Math.sin(((i+1)*scrollPercent/50)*Math.PI)+1)/2*boxScale).toString() + "%";
        wheel[i].style.top =  ((Math.cos(((i+1)*scrollPercent/50)*Math.PI)+1)/2*boxScale).toString() + "%";
    }
}

function createWheels(){
    const container = document.getElementById("wheelContainer");
    for(let i=0; i<wheelCount; i+=1){
        let newWheel = document.createElement("div");
        newWheel.setAttribute("id", `wheel${i}`);
        newWheel.setAttribute("class", "circle");
        newWheel.style.backgroundColor = `hsl(0, 0%, ${(i/wheelCount)*70}%)`;
        container.appendChild(newWheel);
    }
}

function resetWheels(){
    let wheel;
    for(let i=0; i<wheelCount; i+=1){
        wheel = document.getElementById(`wheel${i}`);
        wheel.remove();
    }
}

function updateWheel(){
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = ""
    try{
        const inString = amountIn.value;
        const regex = new RegExp("^[0-9]+$");
        if(regex.test(inString)){
            const amount = parseInt(inString);
            if(amount > 0 && amount < 101){
                resetWheels();
                wheelCount = amount;
                createWheels();
                setValues();
            }
            else{
                errorMsg.textContent = "Please enter a number between 1 and 100"
            }
        }
        else{
            errorMsg.textContent = "Please enter a number between 1 and 100"
        }
    }
    catch(error){
        errorMsg.textContent = "Please enter a number between 1 and 100"
    }
}

function addEvents(){
    if (window.addEventListener){
        window.addEventListener("scroll", setValues, false);
        window.addEventListener("resize", setValues, false);
        updateBtn.addEventListener("click", updateWheel, false);
        amountIn.addEventListener("keyup", function(event){
            if(event.key === "Enter"){
                updateBtn.click();
            }
        }, false)
    }
    else if (window.attachEvent) {
        window.attachEvent("onscroll", setValues);
        window.attachEvent("onresize", setValues);
        updateBtn.attachEvent("onclick", updateWheel);
        amountIn.attachEvent("onkeyup", function(event){
            if(event.key === "Enter"){
                updateBtn.click();
            } 
        });
    }
}

function init(){
    addEvents();
    createWheels();
    setValues();
    document.getElementById("scriptCheck").remove();
}

if (window.addEventListener){
    window.addEventListener("load", init, false);
}
else if (window.attachEvent){
    window.attachEvent("onload", init);
}