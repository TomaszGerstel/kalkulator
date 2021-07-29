class Efficiency {
    constructor(cycleTime, cavityNumber, quantity, multiply) {
        this.cycleTime = cycleTime;
        this.cavityNumber = cavityNumber;
        this.quantity = quantity;
        this.multiply = multiply;
    }
}

function showCalc(efficiency) {
    let cycleRead = document.getElementById("cycleRead");
    cycleRead.innerHTML = efficiency.cycleTime;
    let perHour = document.getElementById("hEfficency");
    perHour.innerHTML = calcEfficency(efficiency);

    // let weight = document.getElementById("weightNeeded");
    // weight.innerHTML = calcWeightOfMaterial(efficiency);

    let goalTime = document.getElementById("goalTime");
    goalTime.innerHTML = calcGoalTime(efficiency);
    let hour = document.getElementById("hour");
    hour.innerHTML = calcHour(efficiency);
}

function toCalculate() {
    let time = document.getElementById("cycle").value;
        let cavity = document.getElementById("cavity").value;
        let quantity = document.getElementById("quantity").value;
        let mult = document.getElementById("multiply").value;
        let efficiency = new Efficiency(time, cavity, quantity, mult);
        showCalc(efficiency);
}

(function registerButtonClick() {
    let addButton = document.getElementById("button");
    addButton.onclick = toCalculate;
})();

function calcEfficency(eff) {
    let perHour = 3600/eff.cycleTime*eff.cavityNumber;
    return Math.round(perHour);
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

function calcGoalSec (eff) {
    return Math.round(eff.quantity*eff.cycleTime*eff.multiply/eff.cavityNumber);
}

function calcGoalMin (eff) {
    return Math.floor(calcGoalSec(eff)/60);
}

function calcGoalHour (eff) {
    return Math.floor(calcGoalMin(eff)/60);
}

// function calcWeightOfMaterial (eff){
//     return eff.quantity...
// }