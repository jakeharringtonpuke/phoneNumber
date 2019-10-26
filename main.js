
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
    
    //user rule inputs expected pattern
    let pattern = "[0-9]{3,4}";
    
    //checks if user input is only 3 or 4 digits long
    if(!(numberEnteredInput.length < 3 && numberEnteredInput.length > 4) ){

        //cleaning user input
        numberEnteredInput.value = (numberEnteredInput.value).match(pattern);

        //testing numberEnteredInput.value
        console.log(`user Input for filer ==>${numberEnteredInput.value}`);

        // check if numberEnteredInput for the rule is valid

        addingUserRuleToArray();

        //test to check userRule_StartsWith array
        console.log(userRule_StartsWith);

        
        //test to check userRule_StartsWith array
        console.log(userRule_EndsWith);
    }
    
    // if the user input for the rule did not mathc the requirements 
    //then an error message is displayed
    if(userRule_StartsWith.length == 0 && userRule_EndsWith.length == 0){
        errorMsgForUserRule();
    }
        
}

function addingUserRuleToArray(){
    const userRule = rulesInput.options[rulesInput.selectedIndex].value

    //test to check the user rule is properly selected
    console.log(userRule);

    // if rule starts With is selected then push that value into the userRule_StartsWith array
    if(userRule == 1){
            
        //check if numberEnteredInput already exists to avoid duplicates
        if(!userRule_StartsWith.includes(numberEnteredInput.value)){
            //final check to not allow any empty values to be pushed to the array
            if(numberEnteredInput.value !== ""){
                userRule_StartsWith.push(numberEnteredInput.value);
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
            }
        }
    }
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
    //if multiple rules applied then do this
        if(userRule_StartsWith.length > 0  && userRule_EndsWith.length > 0 ){
            MultipleRulesApplied();
            //should I make the userRule_StartsWith and userRule_EndsWith array empty?
            userRule_StartsWith.length = 0;
            userRule_EndsWith.length = 0;

             //test
             console.log(MultipleRulesApplied());
        }
        
    //if only one rule applied then do this
        
        //if only starts with rule then do this
        if(userRule_StartsWith.length > 0  && userRule_EndsWith.length == 0){
            startsWithRuleApplied();
            //should I make the userRule_StartsWith array empty?
            userRule_StartsWith.length = 0;

            //test
            console.log(startsWithRuleApplied());
        }
    
        //if only ends with rule is applied then do this
        if(userRule_StartsWith.length == 0 && userRule_EndsWith.length > 0){
            endsWithRuleApplied();
            //should I make the userRule_EndsWith array empty?
            userRule_EndsWith.length = 0;

            //test
            console.log(endsWithRuleApplied());
        }

    //show user the filtered list
        showFilteredListToUser();

        //test
        console.log(showFilteredListToUser());
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

function showFilteredListToUser(){
    return "showFilteredListToUser"
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
