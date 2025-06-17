

var deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", deleteContact);
function deleteContact(){
    var confirmDel = confirm("Delete user ?");
    if(confirmDel){
        fetch(rootPath + 'controller/delete-contact/?=' +id)
        .then(function(response){
            return response.text();
        })
        .then(function(data){
            if(data=="1"){
                homeLink();
            }else{
                alert(data);
            }
        })
    }
   // fetchContacts();
}


document.getElementById("homeLink").addEventListener("click",homeLink);

function editContact(id){
    window.open("edit.html?id=" + id, "_self");

}
var id = getID();
function getID(){
    var url = window.location.href;
    var position = url.search("=");
    var id = url.slice(position +1);
    return id;
}
function getContact(){
    fetch(rootPath+'controller/get-contacts/?id='+id)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayContactinfo();
    })
}
function displayContactinfo(){
    avatarImg =`
        <img src=" ${rootPath}controller/uploads/${data[0].avatar}" width="200"/>
    ` 
    document.getElementById("avatarImage").innerHTML = avatarImg;
    document.getElementById("name").value = `${data[0].firstname}`;
    document.getElementById("surname").value = `${data[0].lasttname}`;
    document.getElementById("email").value = `${data[0].email}`;
    document.getElementById("phone").value = `${data[0].mobile}`;
}

//make contact editable 
document.getElementById("editPage").addEventListener("click",editContact);

function editContact(){
    document.getElementById("name").readOnly = false;
    document.getElementById("surname").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("phone").readOnly = false;

    document.getElementById("avatarLabel").hidden = false;
    document.getElementById("avatar").hidden = false;

    document.getElementById("submitForm-edit").hidden = false;

}

function submitFormEdit(e){
    e.preventDefault(); //prevent reloading
    const formEdit = new FormData(document.querySelector('#editForm'));
    formEdit.append('apiKey',apiKey);
    formEdit.append("id",id);
    fetch(rootPath + 'controller/edit-contact',{
        method:'POST',
        headers:{'Accept': 'application/json, *.*'},
        body: formAdd
    })
    .then( function(response){
        return response.text();
    }) 
    .then(function(data){
        if(data=="1"){
            alert("Contact edited.");
            homeLink();
        }else{
            alert(data);
            homeLink();
        }
    })
}
document.getElementById("submitForm-edit").addEventListener("click",submitFormEdit);


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

// making refresh button responsive
var refreshBtn  = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click",fetchContacts);


//add button uses submitForm
document.getElementById("submitForm-add").addEventListener("click",submitFormAdd);

function submitFormAdd(e){ 
    e.preventDefault();
    const formAdd = new FormData(document.querySelector('#main-user'));
    formAdd.append('apiKey', apiKey);
    /*submit form data to the server*/
    fetch(rootPath + 'controller/insert-contact',{
        method:'POST',
        headers:{'Accept': 'application/json, *.*'},
        body: formAdd
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
    fetch(rootPath + "controller/get-contacts/")
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
            <td><img src="${rootPath}controller/uploads/${data[a].avatar}" width="50px"/></td>
            <td> <h5> ${data[a].firstname} </h5> </td>
            <td> <h5> ${data[a].lastname} </h5> </td>
        </tr>
    `
}
output += "</table>";
document.getElementById("table").innerHTML = output;

}


/*FOR ADD page 

after user clicks submit > run before being posted on the database
var enterKey = document.getElementById();
enterKey.addEventListener("keydown",(event)=>{
    if(event.key ==="Enter"){
        event.preventDefault();
        /*create object to take all possible  user inputs
            name = document.getElementById("name").value.trim()
            surname = document.getElementById("surname").value.trim()
            email = document.getElementById("email").value.trim()
            phone = document.getElementById("phone").value.trim()
        
        validate(userInput);
    }
});*/
//button uses onclick
function addContact(){
    window.open("add.html", "_self");
}


var middle = document.getElementById('middle');
var upper = document.getElementById('upper');
function getMiidle(){
    if(grade=middle){

    }
    fetch()
    .then(function(response){
        return response;

    })
}

