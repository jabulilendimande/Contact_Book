
function validate(userInput){  //validate all user input before submit
    document.getElementById(userInput.id + "-error").innerHTML = "";
    if( !userInput.checkValidity()){
        document.getElementById(userInput.id + "-error").innerHTML = userInput.validationMessage;
        return false;
    }
    trimmedValue = userInput.value.trim();

    switch (userInput.id){
        case "firstname":
        case "lastname":
            if(!/^[A-Za-z]+$/.test(userInput.value)){
                document.getElementById(userInput.id + "-error").innerHTML = "Only letters allowed.";
                return false
                
            }
            break;
        case "email":
            if(!trimmedValue.includes("@")){
                document.getElementById(userInput.id + "-error").innerHTML = "Email must contain @";
                return false;
            }
            break;
        case "phone":
            if(!/^\d{10}$/.test(trimmedValue)){
                document.getElementById(userInput.id + "-error").innerHTML= "Enter a valid 10 digit phone number";
                return false;
            }
            break;
    }
    return true;
}

function validateAll(){
    const inputs = ["firstname" , "lastname" , "email" , "phone"];
    let isValid = true;
    for(let id of inputs){
        const input = document.getElementById(id);
        if(!validate(input)){
            isValid = false;
        
        }    
    }
    return isValid;
}

function submitForm(e){
    if(!validateAll()){
        alert();
        return;
    }
}
