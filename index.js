const copyBtn =document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckbox =document.querySelectorAll("input[type=checkbox]");
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordlength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");



function handleSlider(){
   inputSlider.value=passwordlength;
   lengthDisplay.innerText=inputSlider.value;

   const min=inputSlider.min;
   const max=inputSlider.max;
   inputSlider.style.backgroundSize=(passwordlength-min) *100 / (max-min) + "% 100%";
}

function setIndicator(color){
   indicator.style.background= color;
   indicator.style.boxShadow = `0 0 12px 1px ${color}` ;
}

function handleCheckBoxChange(){
   checkCount=0;
   allCheckbox.forEach((checkbox)=>{
      if(checkbox.checked){
         checkCount++;
      }

      if(passwordlength<checkCount){
         passwordlength=checkCount;
         handleSlider();
      }
   })
}



function calcStrength(funcArr){
   if(funcArr.includes(getUpperCase) && funcArr.includes(getLowercase) && funcArr.includes(getNumber)  && passwordlength>=5){
      setIndicator("#0f0");

   }
   else if(funcArr.includes(getUpperCase) && funcArr.includes(getLowercase) && funcArr.includes(getNumber)  && passwordlength>=4){
      setIndicator("#ff0");

   }
   else if((funcArr.includes(getUpperCase) || funcArr.includes(getLowercase)) && funcArr.includes(getNumber) && passwordlength>=8){
      setIndicator("#ff0");
   }
   else if((funcArr.includes(getUpperCase) || funcArr.includes(getLowercase)) && funcArr.includes(getSymbol) && passwordlength>=8){
      setIndicator("#ff0");
   }
   else if(funcArr.includes(getNumber) && funcArr.includes(getSymbol) && passwordlength>=8){
      setIndicator("#ff0");
   }
   else{
      setIndicator("#f00");
   }
}

async function copyContent(){
   try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText="copied";
   }
   catch(e){
      copyMsg.innerText="Failed";
   }
   copyMsg.classList.add("active");

   setTimeout(()=>{
      copyMsg.classList.remove("active");
   },3000);
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
});

inputSlider.addEventListener("input",()=>{
   passwordlength = inputSlider.value;
   handleSlider();
})

copyBtn.addEventListener("click",()=>{
   if(passwordDisplay.value){
      copyContent();
   }
})

function getrandnum(min,max){
   return Math.floor(Math.random()*(max-min)+min);
}

function getUpperCase(){
   return String.fromCharCode(getrandnum(65,91));
}

function getLowercase(){
   return String.fromCharCode(getrandnum(97,123));
}

function getNumber(){
   return getrandnum(0,10);
}

function getSymbol(){
   return symbols[getrandnum(0,symbols.length)];
}



function shufflePassword(password){
   let newPassword="";
   for(let i=0;i<password.length;i++){
      const j=getrandnum(0,password.length);
      newPassword+=password[j];
      // const temp=password[j];
      // password[j]=password[i];
      // password[i]=temp;
   }
   return newPassword;
}


generateBtn.addEventListener("click",()=>{
   if(checkCount===0){
      alert("Please select at least one option");
      return;
   }

   if(passwordlength<checkCount){
      passwordlength = checkCount;
      handleSlider();
   }
   password="";

   let funcArr=[];
   if(uppercaseCheck.checked){
      funcArr.push(getUpperCase);
   }
   if(lowercaseCheck.checked){
      funcArr.push(getLowercase);
   }
   if(numbersCheck.checked){
      funcArr.push(getNumber);
   }
   if(symbolsCheck.checked){
      funcArr.push(getSymbol);
   }
   for(let i=0;i<funcArr.length;i++){
      password+=funcArr[i]();
   }
   for(let i=0;i<passwordlength-funcArr.length;i++){
      const index=getrandnum(0,funcArr.length);
      password+=funcArr[index]();
   }

   const passssword=shufflePassword(password);

   passwordDisplay.value=passssword;

   calcStrength(funcArr);
})