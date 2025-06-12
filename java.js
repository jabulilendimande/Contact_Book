/*add api function*/
function fetchConntacts(){
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
        <tr>
            <td><img src=""/></td>
        </tr>
    `

}

}