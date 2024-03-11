// login using AUTH API

const onSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const username = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    console.log(`username ${username}, password ${password}`);

    fetch('https://api.kelasprogramming.com/consumer/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    .then(res => res.json())
    .then(body =>{
        localStorage.setItem('todoJWTtoken', body.token)
        localStorage.setItem('todoRefreshToken', body.refresh_token)
        window.location.href ='./index.html'
    })
    .catch(err => {debugger})
};

// register using AUTH API

const registerUser = (event) =>{
    event.preventDefault(); // Prevent the default form submission behavior
    const username = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    console.log(`username ${username}, email ${email}, password ${password}`);
    
    fetch('https://api.kelasprogramming.com/register',{
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })
    })
    .then(res => res.json())
    .then(body =>{
        window.location.href ='./sign-in.html'
    })
    .catch(err => {debugger})
};