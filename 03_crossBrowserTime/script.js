"use strict"

function init(){
    setTimes();
    let updateBtn = document.getElementById("updateBtn");
    if (window.addEventListener){
        updateBtn.addEventListener("click", setTimes);
    }
    else if (window.attachEvent){
        updateBtn.attachEvent("onclick", setTimes);
    }
}

function setTimes(){
    let sysData = document.getElementsByClassName("sysData");
    let selData = document.getElementsByClassName("selData");
    let inDate = document.getElementById("selectDate");
    console.log(typeof(inDate.value));

    let today = new Date();
    let selected = new Date(inDate.value);

    sysData[0].innerText = today;
    sysData[1].innerText = today.getDate();
    sysData[2].innerText = today.getMonth();
    sysData[3].innerText = today.getFullYear();
    sysData[4].innerText = today.getTimezoneOffset();
    
    selData[0].innerText = selected;
    selData[1].innerText = selected.getDate();
    selData[2].innerText = selected.getMonth();
    selData[3].innerText = selected.getFullYear();
    selData[4].innerText = selected.getTimezoneOffset();
}

if (window.addEventListener){
    window.addEventListener("load", init);
}

else if (window.attachEvent) {
    window.attachEvent("onload", init);
}