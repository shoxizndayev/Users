const elCommentList = findElement(`.comments__list`)
const elCommentTemlate = findElement(`#comment__template`).content

const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('login.html')
}

const postId = JSON.parse(window.localStorage.getItem("post__id"));

async function getComments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();

  const array = data.filter((comments) => comments.postId === postId);

  renderComments(array, elCommentList);
}

getComments();

const renderComments = (array, node) => {
  node.innerHTML = null;

  const newFragment = document.createDocumentFragment();

  array.forEach((comment) => {
    const commentTemplate = elCommentTemlate.cloneNode(true);

    commentTemplate.querySelector(".comment__email").textContent = comment.name;
    commentTemplate.querySelector(".comment__body").textContent = comment.body;
    commentTemplate.querySelector(".comment__link").textContent = comment.email;
    commentTemplate.querySelector(".comment__link").href = comment.email;

    newFragment.appendChild(commentTemplate);
  });

  node.appendChild(newFragment);
};
