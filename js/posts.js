const elPostsList = findElement(`.posts__list`)
const elPostTemplate = findElement(`#post__template`).content

const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('login.html')
}


const userId = JSON.parse(window.localStorage.getItem("user__id"));

async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const array = data.filter((post) => post.userId === userId);

  renderPosts(array, elPostsList);
}

getPosts();

const renderPosts = (array, node) => {
    node.innerHTML = null;
  
    const newFragment = document.createDocumentFragment();
    array.forEach((post) => {
      const postTemplate = elPostTemplate.cloneNode(true);
  
      postTemplate.querySelector(".post__title").textContent = post.title;
      postTemplate.querySelector(".post__body").textContent = post.body;
      postTemplate.querySelector(".user__comments").dataset.postId = post.id;
  
      newFragment.appendChild(postTemplate);
    });

    node.appendChild(newFragment);
};

elPostsList.addEventListener("click", (evt) => {
    const button = evt.target;
    if (!button.matches(".user__comments")) return;
    window.localStorage.setItem("post__id", button.dataset.postId);
  });

