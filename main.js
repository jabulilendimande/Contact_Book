var deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", () => {
    alert("Do you want to delete this user");
});


function Enter(){
    document.addEventListener("enter",()=>{
        
    })

}

function validate(userInput){  //validate all user input 
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
let count = 0;
var refresh  = document.getElementById("refresh-btn");
refresh.addEventListener("click",()=>{
    const table = document.getElementById("userInfo");
    const row = doucument.createElement("tr");
    const imageCell = document.createElement("td");//user name
    const textCell = document.createElement("td"); //user surname

    // Add cells to row
            row.appendChild(imageCell);
            row.appendChild(textCell);

            // Append row to table
            table.appendChild(row);

            count++;
});