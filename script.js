class Efficiency {
    constructor(cycleTime, cavityNumber, quantity) {
        this.cycleTime = cycleTime;
        this.cavityNumber = cavityNumber;
        this.quantity = quantity;
    }
}

function showCalc(efficiency) {
    let cycleRead = document.getElementById("cycleRead");
    cycleRead.innerHTML = efficiency.cycleTime;
    let perHour = document.getElementById("hEfficency");
    perHour.innerHTML = calcEfficency(efficiency);
    let goalTime = document.getElementById("goalTime");
    goalTime.innerHTML = calcGoalTime(efficiency);
    let hour = document.getElementById("hour");
    hour.innerHTML = calcHour(efficiency);

}

function calculate() {
    let time = document.getElementById("cycle").value;
        let cavity = document.getElementById("cavity").value;
        let quantity = document.getElementById("quantity").value;
        let efficiency = new Efficiency(time, cavity, quantity);
        showCalc(efficiency);
}

(function registerButtonClick() {
    let addButton = document.getElementById("button");
    addButton.onclick = calculate;
})();

function calcEfficency(efficiency) {
    let perHour = 3600/efficiency.cycleTime*efficiency.cavityNumber;
    return perHour;
}

function calcGoalTime (eff) {
    if (calcGoalMin(eff) < 1) return calcGoalSec(eff) + " sekund";
    if (calcGoalHour(eff) < 1) return calcGoalMin(eff) + " minut i " + (calcGoalSec(eff)-(calcGoalMin(eff)*60)) + " sekund";
    return calcGoalHour(eff) + " godzin, " + (calcGoalMin(eff)-(calcGoalHour(eff)*60)) + " minut i " + (calcGoalSec(eff)-(calcGoalMin(eff)*60)) + " sekund";
}

function calcHour (eff) {
    let today = new Date();
    let hour = new Date(today.getTime()+(calcGoalSec(eff)*1000));
    return hour.getHours() +":"+ hour.getMinutes() +":" + hour.getSeconds() +" (" + hour.toDateString() +")";
}

function calcGoalSec (efficiency) {
    return Math.round(efficiency.quantity*efficiency.cycleTime/efficiency.cavityNumber);
}

function calcGoalMin (efficiency) {
    return Math.floor(calcGoalSec(efficiency)/60);
}

function calcGoalHour (efficiency) {
    return Math.floor(calcGoalMin(efficiency)/60);
}