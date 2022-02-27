const elUsersList = document.querySelector('.users__list');
const elUserTemplate = document.querySelector('#user__template').content;

const token = window.localStorage.getItem('token');

if(!token){
    window.location.replace('login.html')
}

async function getUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
  
    renderUsers(data, elUsersList);
}
  
  getUsers();

const renderUsers = (array, node) => {
    node.innerHTML = null;
  
    const newFragment = document.createDocumentFragment();
    array.forEach((user) => {
      const userTemplate = elUserTemplate.cloneNode(true);
  
      userTemplate.querySelector(".user__name").textContent = user.username;
      userTemplate.querySelector(".user__email").textContent = user.email;
      userTemplate.querySelector(".user__fullname").textContent = user.name;
      userTemplate.querySelector(`.user__street`).textContent = user.address.street
      userTemplate.querySelector(`.user__city`).textContent = user.address.city
      userTemplate.querySelector(`.user__phone`).textContent = user.phone
      userTemplate.querySelector(`.user__website`).textContent = user.website
      userTemplate.querySelector(`.user__company`).textContent = user.company.name
      userTemplate.querySelector(`.user__catch`).textContent = user.company.catchPhrase
      userTemplate.querySelector(".user__posts").dataset.userId = user.id;
  
      newFragment.appendChild(userTemplate);
    });
  
    node.appendChild(newFragment);
};

elUsersList.addEventListener("click", (evt) => {
    const button = evt.target;
    if (!button.matches(".user__posts")) return;
    window.localStorage.setItem("user__id", button.dataset.userId);
  });


log__out.addEventListener('click', () => {
    window.localStorage.removeItem('token');

    window.location.replace('login.html');
})

getUsers()


