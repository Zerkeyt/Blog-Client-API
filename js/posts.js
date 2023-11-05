fetchPosts();

async function fetchPosts() {
   try {
       const response = await fetch("https://blog-api-assignment.up.railway.app/posts");
       const posts = await response.json();

       let i = 8;
       const mainElement = document.querySelector("main");

       for (let post of posts) {
           i++;

           const blog_date = new Date(`${post.date}`);
           let year = blog_date.getFullYear();
           let month = blog_date.getMonth()+1;
           let day = blog_date.getDate();
           let hours = blog_date.getHours();
           let minutes = blog_date.getMinutes();
           minutes = minutes < 10 ? "0" + minutes : minutes;

           let title = post.title ? post.title.charAt(0).toUpperCase() + post.title.slice(1) : "No title";
           mainElement.innerHTML += `<h2>${title}</h2>
               <i><b>Date:</b> ${year}/${month}/${day} <b>Time:</b> ${hours}:${minutes}</i>
               <br>
               <br>`

           mainElement.innerHTML += `<img class="img-blog" src="https://picsum.photos/seed/${i}/600/300">`

           let author = post.author ? post.author : "Unknown";
           mainElement.innerHTML += `
               <br>
               <p><b>Author: </b></p><p class=${choseSignature(author)}>${author}</p><br>`

           mainElement.innerHTML += `
               <p>${addReadMe(post.content)}</p>
               <b><a class="post-link" href="post.html?id=${post._id}&pic-num=${i}&author=${choseSignature(author)}">Read more<a></b>
               <br>
               <br>
           `;

           if (post.tags && post.tags.length > 0) {
               mainElement.innerHTML += `<i><b>Tags: </b>${post.tags.join(", ")}</i><br><br>`
           }
       }

   } catch (error) {
       console.error("Error:", error);
   }
}

function addReadMe(content) {
   if (content.length > 100) {
       content = content.substring(0, 100) + "...";
   } else {
       content += " ";
   }
   return content
}

function choseSignature(author) {
   let signature = "";
   if (author == "") {
       signature = ""
   } else if (author == "") {
       signature = "";
   } else {
       signature = ""
   }

   return signature;
}
