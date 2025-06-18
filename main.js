
var id = getID();
function getID(){
    var url = window.location.href;
    var position = url.search("=");
    var id = url.slice(position +1);
    return id;
}


function getID(){
    var url = window.location.href;
    var position = url.search("id=");
    var id = url.slice(position +1);
    return id;
}





function validate(userInput){  //validate all user input before submit
    if( !userInput.checkValidity()){
        document.getElementById(userInput.id + "-error").innerHTML = userInput.validationMessage;
        return false;
    }
    userInput = userInput.value.trim();

    switch (userInput.id){
        case "name":
            if(!/^[A-Za-z]+$/.test(userInput.value)){
                
            }
            break;
        case "surname":
            if(!/^[A-Za-z]+$/.test(userInput.value)){

            }
            break;
        case "email":
            if(!userInput.value.includes("@")){
                document.getElementById(userInput.id + "-error").innerHTML = "Email must contain @";
                return false;
            }
            break;
        case "phone":
            if(!/^\d{10}$/.test(userInput.value)){
                document.getElementById(userInput.id + "-error").innerHTML= "Enter a valid 10 digit phone number";
                return false;
            }
            break;
    }
    return true;
}
