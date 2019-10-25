//ToDo
//remember each function should do only one job! here one fuction is doing more than one job!!!


const myForm = document.querySelector('#my-form');
const errorMsg = document.querySelector('.msg');
const nameInput = document.querySelector('#name');
const numberEnteredInput = document.querySelector('#numberEntered');
const rulesInput = document.querySelector('#rule');
const userList = document.querySelector('#users');
const resultList = document.querySelector('#results');

let value = 555;
let result = [];
let counter = 1;
let input = [];
let startsWith = '';
let endsWith = '';
let phoneNumberLength = 7;

myForm.addEventListener('submit', onSubmit);
myForm.addEventListener('reset', onReset);

//Takes the users list of phone numbers
//ToDo ==> verify phone number provided is valid numbers and 7 digits, else let the user know.
function phoneNumbers(userProvidedPhoneNumber){
    //if phone number provided is null
    if(!userProvidedPhoneNumber){
        //then imform the user for the valid input parameters
    }
    //if the phone number already exists then ignore
    if(input.includes(userProvidedPhoneNumber.toString())){
        //then tell the user its a duplicate ??? not sure
    }else{
        //if the input is good then push the val to input array
        input.push(userProvidedPhoneNumber.toString());
    }
}

// Rules section Starts here

// starting 3 digits rule
//ToDo ==> force user to only provide numbers and noting else.
function ifStartsWith(value){
    
    //if value given is empty then result array will be equal to the input array and
    // returns the result array
    if(value === ''){
        result = input;
        return result;
    }

    //assigning the startsWith variable with the user provided value
    startsWith = value.toString();

    /* loop through the input array to check if the the first three digits 
       of the phone numbers in the input array matches with the user provided 3 digits.
       If it does match then ignore that value and push the rest of the phone numbers
       into the result array.
    */
    for(let i = 0; i < input.length; i++){
    
        if(input[i].substring(0,3).includes(startsWith)){
        console.log('no');
        }else{
            //so that no duplicate values are entered into the result array.
            if(result.includes(input[i])){
                //if result array already contains then ignore
            }else{
                result.push(input[i]);
            }
            
        }
    }
}

// ending 3 digits rule
function ifEndsWith(value){
    if(value === ''){
        result = input;
        return result;
    }  
  //assigning the startsWith variable with the user provided value
  endsWith = value.toString();
  
  
  for(let i = 0; i < input.length; i++){
    /* if the input array contains phone numbers that ends with the 3 digits that the user provides
        then ignore that number and push the other numbers into the results array.
    */
    
   // phoneNumberLength = 7
    if(input[i].substring((phoneNumberLength/2)+1,phoneNumberLength).includes(endsWith)){
      console.log('no');
    }else{
       //so that no duplicate values are entered into the result array.
        if(result.includes(input[i])){
            //if result array already contains then ignore
        }else{
            result.push(input[i]);
        }
    }
  }
}

console.log(input);

function onSubmit(event){
    event.preventDefault();
   /* if(nameInput.value ==='' || emailInput.value ===''){
        errorMsg.classList.add('error');
        errorMsg.innerHTML = 'please enter all feilds';
        setTimeout(()=>errorMsg.remove(),3000);
    }else{*/
        if(nameInput.value !==''){
        const li =document.createElement('li');
        li.appendChild(document.createTextNode(`${nameInput.value}`));
        userList.appendChild(li);
        phoneNumbers(nameInput.value);
        console.log(input);
        //clear fields
        nameInput.value = '';
        numberEnteredInput.value = '';

        }
            //}
         
}

function onReset(event){
    event.preventDefault();
    //ifStartsWith(emailInput.value);
    const userRule = rulesInput.options[rulesInput.selectedIndex].value
    console.log(userRule);
    if(userRule == 1){
        ifStartsWith(numberEnteredInput.value);
    }else if (userRule == 2){
        ifEndsWith(numberEnteredInput.value);
    }
    
    console.log(`yes == > ${result}`);
    
}

function filterList(){
    console.log(`heloooooooooooooooo==> ${counter}` )
    
    if(counter > 1){
        while(resultList.firstChild) {
            resultList.removeChild(resultList.firstChild);
        }
        //location.reload(true);
    }
  
    for(let i = 0; i < result.length; i++ ){
        if(!result[i]){
        //do something
        }else{
        const li =document.createElement('li');
        li.appendChild(document.createTextNode(`${result[i]}`));
        resultList.appendChild(li);
        }
    }
    counter++;
    result = [];
    console.log(`result after filter==> ${result}`);
}
