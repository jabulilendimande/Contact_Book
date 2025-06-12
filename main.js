var deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", () => {
    alert("Delete user");
    /*DELETE img , name ,username from tablename
    */
});

var editBtn = document.getElementById("")
function editContact(id){
    window.open("edit.html?id=" + id, "_self");

}



/*FOR ADD BUTTON*/
var enterKey = document.getElementById();
enterKey.addEventListener("keydown",(event)=>{
    if(event.key ==="Enter"){
        event.preventDefault();
        /*create object to take all possible  user inputs
            id = document.getElementById("idname").value.trim()
        */
        validate(userInput);
    }
});
function addContact(){
    window.open("add.html", "_self");
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

// making refresh button responsive
var refreshBtn  = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click",fetchContacts());

document.getElementById("submitForm").addEventListener("click",submitForm);
document.getElementById("homeLink").addEventListener('click',homeLink);

function submitForm(e){
    e.preventDefault();
    const form = new FormData(document.querySelector('#main-user'));
    form.append('apiKey', apiKey);
    /*submit form data to the server*/
    fetch(rootPath + 'controller/insert-contact',{
        method:'POST',
        headers:{'Accept': 'application/json, *.*'},
        body: form
    })
    .then( function(response){
        return response.text();
    })  /* return 1  or 0*/
    .then(function(data){
        if(data=="1"){
            alert("Contact added.");
            homeLink();
        }else{
            alert(data);
            homeLink();
        }
    })

}
function homeLink(){
    window.open("index.html","_self");
}


/*add api function*/
function fetchContacts(){
    fetch(rootPath + "contoller/get-contacts/")
    .then(function(response){ /*call back function*/
        return response.json();
    })
    .then(function(data){
        displayOutput(data); /*make new helper function to prevent complex function*/
        //console.log(data);
    })
}

function displayOutput(data){ //data is the object
/*display as a table format*/
output = "<table>";
for(a in data){  /*iterate through object array*/
    output += `
        <tr onclick="edit.html(${data[a].id})">
            <td><img src="${rootPath}controller/uploads/${data[a].avatar}" width="40px"/></td>
            <td> <h5> ${data[a].firstname} </h5> </td>
            <td> <h5> ${data[a].lastname} </h5> </td>
        </tr>
    `
}
output += "</table>";
document.getElementById("table").innerHTML = output;

}



