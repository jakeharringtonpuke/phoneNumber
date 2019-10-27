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
let unwantedItems = [];
let userRuleStartsWith = [];
let userRuleEndsWith = [];
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

function onAdd(event){

    event.preventDefault();  
    
    //user rule inputs expected pattern
    let pattern = "[0-9]{3,4}";
    
    //checks if user input is only 3  digits long
    if(!(numberEnteredInput.length == 3 || numberEnteredInput.length == 4)){

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
        console.log(userRuleStartsWith);

        
        //test to check userRule_EndsWith array
        console.log(userRuleEndsWith);
    }
    
    // if the user input for the rule did not mathc the requirements 
    //then an error message is displayed
    //if user input for rules are not good then the userRule_StartsWith
    //and userRule_EndsWith arrays stay empty.
    if(userRuleStartsWith.length == 0 && userRuleEndsWith.length == 0){
        errorMsgForUserRule();
    }
        
}

function filterList(){  

    console.log(`userRule_StartsWith.length ${userRuleStartsWith.length} and \n 
                userRule_EndsWith.length ${userRuleEndsWith.length} `);
    //if new filter then clean result list
    //cheating big time with this
    if(counter == 1){
        counter = 0;
        location.reload();
    }
    console.log(`check==> ${userRuleStartsWith.length > 0 && userRuleEndsWith.length < 1}`);
    //for only startswith
    if(userRuleStartsWith.length > 0 && userRuleEndsWith.length < 1){
        buildForOnlyStartsWith();
    }

    console.log(`check==> ${userRuleStartsWith.length < 1 && userRuleEndsWith.length > 0}`);
    //for only startswith
    if(userRuleStartsWith.length < 1 && userRuleEndsWith.length > 0){
        buildForOnlyEndsWith();
    }

    console.log(`check==> ${userRuleStartsWith.length > 0 && userRuleEndsWith.length > 0}`);
    //for multiple rules
    if(userRuleStartsWith.length > 0 && userRuleEndsWith.length > 0){
            BuildForMultipleRules();
    }
    
    //should I make the userRule_StartsWith and userRule_EndsWith array empty?
    userRuleStartsWith.length = 0;
    userRuleEndsWith.length = 0;

    console.log(filteredList);
    
    //increases counter to indicate the number of time filter is used
    counter++;
    //show user the filtered list
        showFilteredListToUser();
        filteredList.length = 0

    //test
    //console.log(showFilteredListToUser());
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
//new input of phone number
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

//shows the user the list of rules digits they are creating
function displayRulesDigitForUserList(value){
    //get the user rule selected
   const userRule = rulesInput.options[rulesInput.selectedIndex].text;
   
   const li =document.createElement('li');
   li.appendChild(document.createTextNode(`${userRule.substring(9)}=>${value}`));
   rulesList.appendChild(li);
   
   numberEnteredInput.value = "";
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
        if(!userRuleStartsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRuleStartsWith.push(numberEnteredInput.value);
                return true;
            }           
        }
    }

    // if rule ends With is selected then push that value into the userRule_EndsWith array
    if(userRule == 2){
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRuleEndsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRuleEndsWith.push(numberEnteredInput.value);
                return true;
            }
        }
    }

    return false;
}

//if the user input for the rules are wrong then this error message is used
function errorMsgForUserRule(){
    
    errorMsg.classList.add('error');
    errorMsg.innerHTML = 'please enter a 3 digit number only';
    setTimeout(()=>errorMsg.remove(),3000);    
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
function BuildForMultipleRules(){
    fillFilteredListInitial();
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRuleStartsWith.length; j++){
               if(userRuleStartsWith[j].length == 4){
                    if(listOfPhoneNumbers[i].startsWithFour == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }    
               }
               if(userRuleStartsWith[j].length == 3){
                    if(listOfPhoneNumbers[i].startsWithThree == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
           }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filterList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    i--;
                } 
            }
        }
    }

    //cleaningup removed items
    unwantedItems.length = 0;

    for(let i = 0; i < listOfPhoneNumbers.length; i++){
        for(let j = 0; j < userRuleEndsWith.length; j++){
            if(userRuleEndsWith[j].length == 4){
                if(listOfPhoneNumbers[i].endsWithFour == userRuleEndsWith[j]){
                    unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                }    
            }
            if(userRuleEndsWith[j].length == 3){
                if(listOfPhoneNumbers[i].endsWithThree == userRuleEndsWith[j]){
                    unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                }
            }
        }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filteredList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    i--;
                }
            }
        }
    }
       console.log(`BuildStartsWith second ==> ${filteredList}`)
}

function buildForOnlyStartsWith(){
    fillFilteredListInitial();
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRuleStartsWith.length; j++){
               if(userRuleStartsWith[j].length == 4){
                    if(listOfPhoneNumbers[i].startsWitFour == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                        //does extra check thats not needed
                    }
               }
               if(userRuleStartsWith[j].length == 3){
                    if(listOfPhoneNumbers[i].startsWithThree == userRuleStartsWith[j]){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
               }
           }
    }
    console.log(`startswith new27 ==> ${unwantedItems}`);
    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filterList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                } 
            }
        }
    }

    //cleaningup removed items
    unwantedItems.length = 0;
}

function buildForOnlyEndsWith(){
    fillFilteredListInitial();
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
           for(let j = 0; j < userRuleEndsWith.length; j++){
                if(userRuleEndsWith[j].length == 4){
                    if((listOfPhoneNumbers[i].endsWithFour == userRuleEndsWith[j])){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
                if(userRuleEndsWith[j].length == 3){
                    if((listOfPhoneNumbers[i].endsWithThree == userRuleEndsWith[j])){
                        unwantedItems.push(listOfPhoneNumbers[i].phoneNumber);
                    }
                }
           }
    }

    for(let i = 0; i < filteredList.length; i++){
        for(let j = 0; j < unwantedItems.length; j++){
            if(filteredList[i] !== null && filteredList[i] !== undefined){
                if(filteredList[i] == unwantedItems[j]){
                    filteredList.splice(i,1);
                    //because the fileteredList array size goes down after splice
                    //i--;
                    j--;
                }
            }
        }
    }

}
function fillFilteredListInitial(){
    for(let i = 0; i < listOfPhoneNumbers.length; i++){
        filteredList.push(listOfPhoneNumbers[i].phoneNumber);
    }
}

//creates li element to display filtered list of phone numbers
function showFilteredListToUser(){
    for(let i = 0 ; i < filteredList.length; i++ ){
     const li =document.createElement('li');
     li.appendChild(document.createTextNode(`${filteredList[i]}`));
     resultList.appendChild(li);
    }
}
