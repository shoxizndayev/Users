const elLoginForm = findElement(`.login__form`)
const elInputEmail = findElement(`.input__email`)
const elInputPassword = findElement(`.input__password`)
const elInputNumber = findElement(`.input__number`)
const elHeading = findElement(`.heading`)

elLoginForm.addEventListener('submit', (evt) =>{
    evt.preventDefault()
    const usernameInput = elInputEmail.value.trim();
    const passwordInput = elInputPassword.value.trim();

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers:{
            'Content-Type': "application/json"  
        },
        body:JSON.stringify({
                email: usernameInput,
                password: passwordInput,
        }),
    }).then((response) => response.json())
    .then((data) => {
        if(data?.token){
            window.localStorage.setItem('token', data.token);

            window.location.replace('index.html');
        }
    });
});
