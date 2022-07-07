const bill = document.querySelector('.bill-amount');
const tipBtns = document.querySelectorAll('.green');
const tipCustom = document.querySelector('.custom');
const people = document.querySelector('.number-of-people');
const errorMsg = document.querySelector('.zero');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.cta');


bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0;
let tipValue = 0.0;
let peopleValue = 1; 

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick(event){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('active-bg');

        //set active state 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('active-bg');
            tipValue = parseFloat(btn.innerHTML)/100;
        }else {
            btn.classList.remove('active-bg');
        }
    });

    //clear custom tip
    tipCustom.value = '';

    calculateTip();

}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    
    tipValue = parseFloat(tipCustom.value/100);

    //remove active state from buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
    
    //console.log(tipValue);
}

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){

        errorMsg.classList.remove('hide');
        people.classList.add('active')
        setTimeout(function(){
            errorMsg.classList.remove('error');
        }, 1000);
    } else{
        errorMsg.classList.add('hide');
    }

    calculateTip();
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset(){
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();
}