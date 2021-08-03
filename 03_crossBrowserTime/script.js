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
    sysData[6].innerText = Date.parse(newSysDate) + (sysOffset * 60000);
    sysData[7].innerText = new Date(Date.parse(newSysDate) + (sysOffset * 60000));
    
    let newSelDate = `${selected.getFullYear()}-${selected.getMonth() + 1}-${selected.getDate()}`;
    let selOffset = selected.getTimezoneOffset();
    selData[0].innerText = selected;
    selData[1].innerText = selected.getDate();
    selData[2].innerText = selected.getMonth() + 1;
    selData[3].innerText = selected.getFullYear();
    selData[4].innerText = selOffset;
    selData[5].innerText = newSelDate;
    selData[6].innerText = Date.parse(newSelDate) + (selOffset * 60000);
    selData[7].innerText = new Date(Date.parse(newSelDate) + (selOffset * 60000));

    let parseIn = document.getElementsByClassName("parseIn"); 
    let parseOut = document.getElementsByClassName("parseOut");
    let parseDate = document.getElementsByClassName("parsedDate");
    parseIn[0].innerText = new Date(1580515200000);
    parseIn[1].innerText = "\"2020-02-01\"";
    parseIn[2].innerText = "\"2020 02 01\"";
    parseIn[3].innerText = "\"2020 2 1\"";
    parseIn[4].innerText = "2020, 2, 1";
    parseIn[5].innerText = "\"2020/02/01\""
    parseIn[6].innerText = "\"2020/2/1\""
    parseIn[7].innerText = "\"2020-02-01T00:00:00.000+00:00\""
    
    parseOut[0].innerText = Date.parse(new Date(1580515200000));
    parseOut[1].innerText = Date.parse("2020-02-01");
    parseOut[2].innerText = Date.parse("2020 02 01");
    parseOut[3].innerText = Date.parse("2020 2 1");
    parseOut[4].innerText = Date.parse(2020, 2, 1);
    parseOut[5].innerText = Date.parse("2020/02/01");
    parseOut[6].innerText = Date.parse("2020/2/1");
    parseOut[7].innerText = Date.parse("2020-02-01T00:00:00.000+00:00");

    parseDate[0].innerText = new Date(Date.parse(new Date(1580515200000)));
    parseDate[1].innerText = new Date(Date.parse("2020-02-01"));
    parseDate[2].innerText = new Date(Date.parse("2020 02 01"));
    parseDate[3].innerText = new Date(Date.parse("2020 2 1"));
    parseDate[4].innerText = new Date(Date.parse(2020, 2, 1));
    parseDate[5].innerText = new Date(Date.parse("2020/02/01"));
    parseDate[6].innerText = new Date(Date.parse("2020/2/1"));
    parseDate[7].innerText = new Date(Date.parse("2020-02-01T00:00:00.000+00:00"));
}

if (window.addEventListener){
    window.addEventListener("load", init);
}

else if (window.attachEvent) {
    window.attachEvent("onload", init);
}