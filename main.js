const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const numberInput = document.querySelector('#phoneNumber');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const rulesList = document.querySelector('#rulesList');
const resultList = document.querySelector('#results');

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onAdd);

let listOfPhoneNumbers = [];
let removedItems = [];
let userRule_StartsWith = [];
let userRule_EndsWith = [];
let filteredList = [];
let counter = 0;


class phone{
  constructor(phoneNumber){
    //make phoneNumber into string
    phoneNumber = phoneNumber.toString();

    this.phoneNumber = phoneNumber;
    this.startsWithThree = phoneNumber.substring(0,3);
    this.endsWithThree = phoneNumber.substring(4);
    this.startsWithFour = phoneNumber.substring(0,4);
    this.endsWithFour = phoneNumber.substring(3);
  }
}

function createPhoneNumber(userProvidedNumber){
    //check params
    //user phone number expected pattern
    let pattern = "[0-9]{7}";
    userProvidedNumber = userProvidedNumber.match(pattern);

    //test userProvidedNumber
    console.log(`userProvidedNumber from createPhoneNumber ${userProvidedNumber}`)

    //create phone number
    const newPhone = new phone(userProvidedNumber);

    return newPhone;
    
}


function onSubmit(event){
    event.preventDefault();

    if(numberInput.value !==''){
    
        //creates a phone
        let userInputPhoneNumber = createPhoneNumber(numberInput.value);
        
        //building the user phone list
        buildTheUserPhoneList(userInputPhoneNumber);
        
        //Testing the phoneArray
        console.log(listOfPhoneNumbers)

        //clear fields
        numberInput.value = '';
    
    }     
}

//if phone number dosent exits then adds to the listOfPhoneNumbers array 
//else checks if the phone number provided already exits
//if it does not exist, then pushes the phone to the 
//listOfPhoneNumbers array
function buildTheUserPhoneList(phone){  
        if(listOfPhoneNumbers.length == 0){
            listOfPhoneNumbers.push(phone);
            displayPhoneListForUserList(phone.phoneNumber);
        }
        if(!traverseForDuplicateInListOfPhoneNumbers(phone)){
            listOfPhoneNumbers.push(phone);
            displayPhoneListForUserList(phone.phoneNumber);
        }
        
}

//checks if listOfPhoneNumbers array has a number that mathces users 
//new input of phone of phone number
function traverseForDuplicateInListOfPhoneNumbers(phone){
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
       if(listOfPhoneNumbers[i].phoneNumber == phone.phoneNumber){
           return true;
       }
    }
    return false;
}

//shows the user the list of phone numbers they are creating
function displayPhoneListForUserList(value){
     
     const li =document.createElement('li');
     li.appendChild(document.createTextNode(`${value}`));
     userList.appendChild(li);
}

function onAdd(event){

    event.preventDefault();  
    
    //user rule inputs expected pattern
    let pattern = "[0-9]{3,4}";
    
    //checks if user input is only 3 or 4 digits long
    if(!(numberEnteredInput.length < 3 && numberEnteredInput.length > 4) ){

        //cleaning user input
        numberEnteredInput.value = (numberEnteredInput.value).match(pattern);

        //testing numberEnteredInput.value
        console.log(`user Input for filer ==>${numberEnteredInput.value}`);

        // add numberEnteredInput to either userRule_StartsWith array or
        // userRule_EndsWith array
        //and returns true if the digit was added
         let digitsAdded = addingUserRuleToUserRule_StartsWithAndUserRule_EndsWithArrays();


        //display the user
        if(digitsAdded){
            displayRulesDigitForUserList(numberEnteredInput.value);
        }

        //test to check userRule_StartsWith array
        console.log(userRule_StartsWith);

        
        //test to check userRule_EndsWith array
        console.log(userRule_EndsWith);
    }
    
    // if the user input for the rule did not mathc the requirements 
    //then an error message is displayed
    //if user input for rules are not good then the userRule_StartsWith
    //and userRule_EndsWith arrays stay empty.
    if(userRule_StartsWith.length == 0 && userRule_EndsWith.length == 0){
        errorMsgForUserRule();
    }
        
}

//shows the user the list of rules digits they are creating
function displayRulesDigitForUserList(value){
    //get the user rule selected
   const userRule = rulesInput.options[rulesInput.selectedIndex].text;
   
   const li =document.createElement('li');
   li.appendChild(document.createTextNode(`${userRule} ==> ${value}`));
   rulesList.appendChild(li);
}

// Rules section Starts here
function addingUserRuleToUserRule_StartsWithAndUserRule_EndsWithArrays(){

    //get the user rule selected
    const userRule = rulesInput.options[rulesInput.selectedIndex].value

    //test to check the user rule is properly selected
    console.log(userRule);

    // if rule starts With is selected then push that value into the 
    //userRule_StartsWith array
    if(userRule == 1){
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRule_StartsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRule_StartsWith.push(numberEnteredInput.value);
                return true;
            }           
        }
    }

    // if rule ends With is selected then push that value into the userRule_EndsWith array
    if(userRule == 2){
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRule_EndsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRule_EndsWith.push(numberEnteredInput.value);
                return true;
            }
        }
    }

    return false;
}

//if the user input for the rules are wrong then this error message is used
function errorMsgForUserRule(){
    
    errorMsg.classList.add('error');
    errorMsg.innerHTML = 'please enter 3 or 4 digit number only';
    setTimeout(()=>errorMsg.remove(),3000);    
}

function filterList(){  

    console.log(`userRule_StartsWith.length ${userRule_StartsWith.length} and \n 
                userRule_EndsWith.length ${userRule_EndsWith.length} `);
    //if new filter then clean result list
    if(counter == 1){
        counter = 0;
        location.reload();
    }
    BuildStartsWith();
    //should I make the userRule_StartsWith and userRule_EndsWith array empty?
    userRule_StartsWith.length = 0;
    userRule_EndsWith.length = 0;

    console.log(filteredList);
    
    //increases counter to indicate the number of time filter is used
    counter++;
    //show user the filtered list
        showFilteredListToUser();
        filteredList.length = 0

    //test
    //console.log(showFilteredListToUser());
}

//idl if i need this
function accesOnePhoneObject(phoneNumber){
    for(let i = 0; i < listOfPhoneNumbers.length; i++ ){
        if(listOfPhoneNumbers[i].phoneNumber == phoneNumber){
            return listOfPhoneNumbers[i];
        }
    }
    return null;
}

function cleanResultList(){
    //if new filter then clean result list
    if(counter > 0){
        while(resultList.firstChild) {
            resultList.removeChild(resultList.firstChild);
        }
    }
}

//TODO
function BuildStartsWith(){
       for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRule_StartsWith.length; j++){
               if(listOfPhoneNumbers[i].startsWithThree !== userRule_StartsWith[j]){
                   filteredList.push(listOfPhoneNumbers[i].phoneNumber);
               }
           }
       }

       filteredList = [...new Set(filteredList)];
       console.log(`BuildStartsWith first ==> ${filteredList}`)

       for(let i = 0; i < listOfPhoneNumbers.length; i++){
            for(let j = 0; j < userRule_EndsWith.length; j++){
                if(listOfPhoneNumbers[i].endsWithThree !== userRule_EndsWith[j]){
                    filteredList.push(listOfPhoneNumbers[i].phoneNumber);;
                }
            }
        }
        for(let i = 0; i < filteredList.length; i++){
            for(let j = 0; j < userRule_EndsWith.length; j++){    
                if(filteredList[i].substring(4) == userRule_EndsWith[j] ){
                    filteredList.splice(i,1);
                }
            }
        }

        filteredList = [...new Set(filteredList)]; 
       console.log(`BuildStartsWith second ==> ${filteredList}`)
}

//creates li element to display filtered list of phone numbers
function showFilteredListToUser(){
    for(let i = 0 ; i < filteredList.length; i++ ){
     const li =document.createElement('li');
     li.appendChild(document.createTextNode(`${filteredList[i]}`));
     resultList.appendChild(li);
    }
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