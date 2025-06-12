/*add api function*/
function fetchConntacts(){
    fetch(rootPath + "contoller/get-contacts/")
    .then(function(response){ /*call back function*/
        return response.json();
    })
    .then(function(data){
        displayOutput(data); /*make new helper function to prevent complex function*/
    })
}

function displayOutput(){

}