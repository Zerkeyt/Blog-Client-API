    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            postId: urlParams.get("id"),
            picNum: urlParams.get("pic-num"),
            authorSignature: urlParams.get("author")
        };
      }
      
      const { postId, picNum, authorSignature } = getUrlParams();
      
      fetchPost();
      
      async function fetchPost() {
        try {
            const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`);
            const post = await response.json();
            
            let postDate = new Date(post.date);
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      
            document.querySelector("#date").textContent = `${postDate.getDate()}-${months[postDate.getMonth()]}-${postDate.getFullYear()}`;
            document.querySelector("#time").textContent = `${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`;
      
            let title = post.title ? post.title.charAt(0).toUpperCase() + post.title.slice(1) : "No title";
            document.querySelector("h1").textContent = title;
      
            updateAuthor(post.author);
            updateTags(post.tags);
      
            document.querySelector("#pic-div").innerHTML = `<img class="img-post" src="https://picsum.photos/seed/${picNum}/600/300">`;
      
            document.querySelector("#content").textContent = post.content;
      
        } catch (error) {
            console.error("Error:", error);
        }
      }
      
      function updateAuthor(author) {
        let authorElement = document.querySelector("#author-wrapper");
        authorElement.textContent = author ? author : "Unknown";
      }
      
      function updateTags(tags) {
        let tagsElement = document.querySelector("#tags");
        tagsElement.textContent = tags && tags.length > 0 ? tags.join(", ") : "";
      }
      
      function updateTags(tags) {
        let tagsElement = document.querySelector("#tags");
        tagsElement.innerHTML = tags && tags.length > 0 ? `<b>TAGS: </b>${tags.join(", ")}` : "";
    }
    