//ToDo
//remember each function should do only one job! here one fuction is doing more than one job!!!


const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const numberInput = document.querySelector('#phoneNumber');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const resultList = document.querySelector('#results');

let phoneArray = [];
let userRule_StartsWith = [];
let userRule_EndsWith = [];

class phone{
  constructor(startsWith,endsWith,phoneNumber){
    this.phoneNumber = phoneNumber;
    this.startsWith = startsWith;
    this.endsWith = endsWith;
  }
}
function createPhoneNumber(userProvidedNumber){
    //check params

    //make userProvidedNumber into string
    userProvidedNumber = userProvidedNumber.toString();
    //if good then add number to the number
    const newPhone = new phone(userProvidedNumber.substring(0,3),userProvidedNumber.substring(4),
                    userProvidedNumber);

    return newPhone;
    
  }

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onReset);


// Rules section Starts here


function onSubmit(event){
    
    event.preventDefault();
   
    if(numberInput.value !==''){
    
        //building the user phone list
        let userInputPhoneNumber = createPhoneNumber(numberInput.value);
        phoneArray.push(userInputPhoneNumber);

        //Testing the phoneArray
        console.log(phoneArray)

        //shows the user the list of phone numbers they are creating
        const li =document.createElement('li');
        li.appendChild(document.createTextNode(`${numberInput.value}`));
        userList.appendChild(li);
        //clear fields
        numberInput.value = '';
    
    }     
}

function addRules(){
    
    const userRule = rulesInput.options[rulesInput.selectedIndex].value
    //test to check the user rule is properley selected
    console.log(userRule);

    // check if numberEnteredInput for the rule is valid

    // if rule starts With is selected then push that value into the userRule_StartsWith array
    if(userRule === 1){
        userRule_StartsWith.push(numberEnteredInput.value);
    }

    //test to check userRule_StartsWith array
    console.log(userRule_StartsWith);

    // if rule ends With is selected then push that value into the userRule_EndsWith array
    if(userRule === 1){
        userRule_EndsWith.push(numberEnteredInput.value);
    }
    //test to check userRule_StartsWith array
    console.log(userRule_StartsWith);
}

function filterList(){  
  
}












/*

function onReset(event){
    
    event.preventDefault();  
    const userRule = rulesInput.options[rulesInput.selectedIndex].value
    console.log(userRule);
    
}
numberEnteredInput.value = '';

if(nameInput.value ===''){
        errorMsg.classList.add('error');
        errorMsg.innerHTML = 'please enter all feilds';
        setTimeout(()=>errorMsg.remove(),3000);
    }else


for(let i = 0; i < intermediate.length; i++ ){
        
        const li =document.createElement('li');
        li.appendChild(document.createTextNode(`${intermediate[i].phoneNumber}`));
        resultList.appendChild(li);
    } */
