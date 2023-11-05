let checkboxes = document.querySelectorAll('input[name="tags"]');
let selectedTagsDiv = document.getElementById('selected-tags');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedTags);
});

function updateSelectedTags() {
    let selectedTags = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTags.push(checkbox.value);
        }
    });

    selectedTagsDiv.textContent = selectedTags.join(', ');
}


let serializeForm = function (form) {
    var obj = {};
    var formData = new FormData(form);
 
    for (var key of formData.keys()) {
        let inputData = formData.getAll(key);
 
        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];   
        }
    }
    return obj;
 };
 
 document.getElementById('create-post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    let form = e.target;
    document.getElementById('error-message').innerHTML = '';
    
    let formDataObject = serializeForm(form);
 
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });
 
        if(!response.ok) {
            throw new Error(response.status);
        }
        let data = await response.json();
 
        if(data.hasOwnProperty('_id')) {
            window.history.back();
        }
 
        
        const errorData = Object.values(data.message.errors);
 
       
        let errorDivs = '';
        for(let value of errorData) {
            errorDivs += `<div>${value.message}</div>`;
        }
        document.getElementById('error-message').innerHTML = errorDivs;
 
    } catch(error) {
        console.log(error);
        document.getElementById('error-message').innerHTML = `An error occurred: ${error.message}`;
    }
 });