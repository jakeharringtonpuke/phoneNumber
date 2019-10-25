//ToDo
//remember each function should do only one job! here one fuction is doing more than one job!!!


const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const nameInput = document.querySelector('#name');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const resultList = document.querySelector('#results');

let phoneArray = [];

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
   
    if(nameInput.value !==''){
    
        //building the user phone list
        let userInputPhoneNumber = createPhoneNumber(nameInput.value);
        phoneArray.push(userInputPhoneNumber);

        //Testing the phoneArray
        console.log(phoneArray)

        //shows the user the list of phone numbers they are creating
        const li =document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}`));
        userList.appendChild(li);
        //clear fields
        nameInput.value = '';
    
    }     
}

function onReset(event){
    
    event.preventDefault();  
    const userRule = rulesInput.options[rulesInput.selectedIndex].value
    console.log(userRule);
    
}

function filterList(){  
  
}












/*

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
