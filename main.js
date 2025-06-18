
var id = getID();
function getContact(){
    fetch(rootPath+'controller/get-contacts/?id='+id)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayContactinfo(data);
    })
}
function displayContactinfo(data){
    avatarImg =`<img src=" ${rootPath}controller/uploads/${data[0].avatar}" width="200"/>`; 
    document.getElementById("avatarImage").innerHTML = avatarImg;
    document.getElementById("name").value = `${data[0].firstname}`;
    document.getElementById("surname").value = `${data[0].lastname}`;
    document.getElementById("email").value = `${data[0].email}`;
    document.getElementById("phone").value = `${data[0].mobile}`;
}

const deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", deleteContact);

function deleteContact(){
    var confirmDel = confirm("Delete user ?");
    if(confirmDel){
        fetch(rootPath + 'controller/delete-contact/?id=' +id)
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

//when home button is clicked , it should use homelink() to direct to index.html
document.getElementById("homeLink").addEventListener("click",homeLink);

function homeLink(){
    window.location.href = 'index.html';
}
//make contact editable 
document.getElementById("editPage").addEventListener("click",editContacts);

function editContacts(){
    document.getElementById("firstname").readOnly = false;
    document.getElementById("lastname").readOnly = false;
    document.getElementById("email").readOnly = false;
    document.getElementById("phone").readOnly = false;

    document.getElementById("avatarLabel").hidden = false;
    document.getElementById("avatar").hidden = false;

    document.getElementById("submitForm-edit").hidden = false;

}
document.getElementById("submitForm-edit").addEventListener("click",submitFormEdit);

function submitFormEdit(e){
    e.preventDefault(); //prevent reloading
    const formEdit = new FormData(document.querySelector('#editForm'));
    formEdit.append('apiKey',apiKey);
    formEdit.append("id",id);
    fetch(rootPath + 'controller/edit-contact',{
        method:'POST',
        headers:{'Accept': 'application/json, *.*'},
        body: formEdit
    })
    .then( function(response){
        return response.text();
    }) 
    .then(function(data){
        if(data==="1"){
            alert("Contact edited.");
            homeLink();
        }else{
            alert(data);
            homeLink();
        }
    })
}
function editContact(id){
    window.location.href = 'edit.html';
}

/*Add page */

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

document.getElementById("addContact").addEventListener("click",addContact);
//button uses onclick
function addContact(){
    window.location.href = 'add.html';
}

function getID(){
    var url = window.location.href;
    var position = url.search("id=");
    var id = url.slice(position +1);
    return id;
}/*function getID() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}*/


// making refresh button responsive
var refreshBtn  = document.getElementById("refresh-btn");
refreshBtn.addEventListener("click",fetchContacts);

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
        <tr onclick="editContact(${data[a].id})">
            <td><img src="${rootPath}controller/uploads/${data[a].avatar}" width="40px"/></td>
            <td> <h5> ${data[a].firstname} </h5> </td>
            <td> <h5> ${data[a].lastname} </h5> </td>
        </tr>
    `
}
output += "</table>";
document.getElementById("table").innerHTML = output;

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

/*document.addEventListener("DOMContentLoaded", function () {*/