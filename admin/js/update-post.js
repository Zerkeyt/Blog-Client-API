let urlParams = new URLSearchParams(window.location.search);
let postId = urlParams.get("id");

getPost();

async function getPost() {
   try {
       let response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
       let post = await response.json();

       document.getElementById("title-input").value = post.title;
       document.getElementById("author-input").value = post.author;
       document.getElementById("post-textarea").value = post.content;

       if (post.tags.length >= 0) {
           for (let tag of post.tags) {
               let checkbox = document.querySelector(`input[name="tags"][value="${tag}"]`);
               if (checkbox) {
                  checkbox.checked = true;
               }
           }
       }
   } catch (error) {
       console.error('Failed to fetch post:', error);
   }
}

document.getElementById("update-post-form").addEventListener("submit", async function (e) {
   e.preventDefault();
   let form = e.target;

   let formDataObject = serializeForm(form);

   try {
       await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(formDataObject)
       })
   } catch (error) {
       console.error('Failed to update post:', error);
   }

   location.replace("index.html");
});

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
