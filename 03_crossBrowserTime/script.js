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

    let today = new Date();
    let selectedTemp = new Date(inDate.value);
    let offset = selectedTemp.getTimezoneOffset();
    let selected = new Date(Date.parse(selectedTemp) + (offset * 60000));

    let newSysDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let sysOffset = today.getTimezoneOffset();
    sysData[0].innerText = today;
    sysData[1].innerText = today.getDate();
    sysData[2].innerText = today.getMonth() + 1;
    sysData[3].innerText = today.getFullYear();
    sysData[4].innerText = sysOffset;
    sysData[5].innerText = newSysDate;
    sysData[6].innerText = `${Date.parse(newSysDate) + (sysOffset * 60000)}`;
    sysData[7].innerText = new Date(Date.parse(newSysDate) + (sysOffset * 60000));
    
    let newSelDate = `${selected.getFullYear()}-${selected.getMonth() + 1}-${selected.getDate()}`;
    let selOffset = selected.getTimezoneOffset();
    selData[0].innerText = selected;
    selData[1].innerText = selected.getDate();
    selData[2].innerText = selected.getMonth() + 1;
    selData[3].innerText = selected.getFullYear();
    selData[4].innerText = selOffset;
    selData[5].innerText = newSelDate;
    selData[6].innerText = `${Date.parse(newSelDate) + (selOffset * 60000)}`;
    selData[7].innerText = new Date(Date.parse(newSelDate) + (selOffset * 60000));
}

if (window.addEventListener){
    window.addEventListener("load", init);
}

else if (window.attachEvent) {
    window.attachEvent("onload", init);
}