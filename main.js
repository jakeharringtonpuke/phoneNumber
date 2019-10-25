//ToDo
//remember each function should do only one job! here one fuction is doing more than one job!!!


const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const numberInput = document.querySelector('#phoneNumber');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const resultList = document.querySelector('#results');

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onAdd);

let phoneArray = [];
let userRule_StartsWith = [];
let userRule_EndsWith = [];
let filteredListForMultipleRules = [];
let filteredListForStartsWithRuleApplied = [];
let filteredListForEndsWithRuleApplied = [];


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

function onAdd(event){
    
    event.preventDefault();  
    const userRule = rulesInput.options[rulesInput.selectedIndex].value
    //test to check the user rule is properley selected
    console.log(userRule);

    // check if numberEnteredInput for the rule is valid

    // if rule starts With is selected then push that value into the userRule_StartsWith array
    if(userRule == 1){
        
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRule_StartsWith.includes(numberEnteredInput.value)){
            userRule_StartsWith.push(numberEnteredInput.value);
        }
    }

    //test to check userRule_StartsWith array
    console.log(userRule_StartsWith);

    // if rule ends With is selected then push that value into the userRule_EndsWith array
    if(userRule == 2){

        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRule_EndsWith.includes(numberEnteredInput.value)){
            userRule_EndsWith.push(numberEnteredInput.value);
        }
    }
    //test to check userRule_StartsWith array
    console.log(userRule_EndsWith);
}

function filterList(){  

    //if multiple rules applied then do this
        if(userRule_StartsWith.length > 0  && userRule_EndsWith.length > 0 ){
            MultipleRulesApplied();
            //should I make the startsWith and endsWith array null?
        }
        
    //if only one rule applied then do this
        
        //if only starts with rule then do this
        if(userRule_StartsWith.length > 0  && userRule_EndsWith.length == 0){
            startsWithRuleApplied();
        }
    
        //if only ends with rule is applied then do this
        if(userRule_StartsWith.length == 0 && userRule_EndsWith.length > 0){
            endsWithRuleApplied();
        }

    //show user the filtered list
        showFilteredListToUser();
}

function MultipleRulesApplied(){
    //if phone number starts with xxx and ends with yyy then ignore that number
    // else push number into the filteredListForMultipleRules
    return "MultipleRulesApplied";
}

function startsWithRuleApplied(){
    //if phone number does not start with xxx then push into the filteredListForStartsWithRuleApplied 
    return "startsWithRuleApplied";
}


function endsWithRuleApplied(){
    //if phone number does not start with xxx then push into the filteredListForEndsWithRuleApplied
    return "endsWithRuleApplied";
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
