const fetchPosts = async () => {
    try {
        const response = await fetch('https://blog-api-assignment.up.railway.app/posts');
        const posts = await response.json();
        return posts.map(createPostHTML);
    } catch(error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
 }
 
 const createPostHTML = (post) => {
    const postDate = new Date(post.date);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 
    return `
        <tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.tags}</td>
            <td>${postDate.getDate()}-${months[postDate.getMonth()]}-${postDate.getFullYear()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}</td>
            <td>
                <a href="update-post.html?id=${post._id}">Update</a>
                <a href="#" class="del-btn" data-id="${post._id}">Delete</a>
            </td>
        </tr>
    `;
 }
 
 const setupDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll('.del-btn');
 
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            const postId = e.target.dataset.id;
 
            try {
                const response = await fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, {
                   method: 'DELETE',
                   headers: { 'Content-Type': 'application/json' }
                });
 
                if (!response.ok) {
                   throw new Error(response.status);
                }
 
                e.target.parentNode.parentNode.remove();
            } catch(error) {
                console.error('Failed to delete post:', error);
            }
        });
    });
 }
 
 const fetchAllPosts = async () => {
    const postsHTML = await fetchPosts();
    document.getElementById('blog-posts-admin').innerHTML = postsHTML.join('');
    setupDeleteButtons();
 }
 
 fetchAllPosts();
 