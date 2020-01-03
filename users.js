document.getElementById('registerButton').addEventListener('click', registerModalOpen, false);
document.getElementById('cancelregister').addEventListener('click', registerModalClose, false);
document.getElementById('registersubmit').addEventListener('click', register, false);
document.getElementById('registersubmit').addEventListener('click', registerModalClose, false);

document.getElementById('logoutButton').addEventListener('click', logout, false);

document.getElementById('loginButton').addEventListener('click', loginModalOpen, false);
document.getElementById('cancellogin').addEventListener('click', loginModalClose, false);
document.getElementById('loginsubmit').addEventListener('click', login, false);
document.getElementById('loginsubmit').addEventListener('click', loginModalClose, false);



function logout() {
    fetch('logout.php', {
        method: 'POST'  
    })
    .then(resp => resp.json())
    .then(response => {
        if (response.success) {
            document.getElementById('registerButton').style.visibility = 'visible';
            document.getElementById('loginButton').style.visibility = 'visible';
            document.getElementById('logoutButton').style.visibility = 'hidden';
            fillEvents();
            token = "";
        }
    })
    .catch(err => console.log(err))
}

function registerModalOpen() {
    document.getElementById('register').style.display = "block";
}

function registerModalClose() {
    document.getElementById('register').style.display = "none";
}

function loginModalOpen() {
    document.getElementById('login').style.display = "block";
}

function loginModalClose() {
    document.getElementById('login').style.display = "none";
}


function login() {
    let username = document.getElementById('loginusername').value;
    let password = document.getElementById('loginpassword').value;

    
    //create array of data of be posted
    let data = { 'username': username, 'password': password}

    fetch('login.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'content-type':'application/json'}    
    })
    .then(res => res.json())
    .then(response => {
        if (response.success){
            console.log('logged in!');
            document.getElementById('registerButton').style.visibility = 'hidden';
            document.getElementById('loginButton').style.visibility = 'hidden';
            document.getElementById('logoutButton').style.visibility = 'visible';
            fillEvents();
            // console.log(response.pass);
            token = resp.token;
        }
        else {
            console.log(response.message);
        }
    })
    .catch(err => console.log(err))
    //.then(sending => console.log(sending.success ? "Logged in!" : 'You were not logged in ${sending.message}')); 
}


// REGISTER FUNCTION AND EVENT LISTENER
function register() {
    let username = document.getElementById('registerusername').value;
    let password = document.getElementById('registerpassword').value;

   
    let sending = { 'username' : username, 'password': password};

    fetch('register.php', {
        method: 'POST',
        body: JSON.stringify(sending),
        headers: {'content-type' : 'application/json'}
    })
    .then(response => response.json())
    .then(resp => {
        if (resp.success) {
            console.log('registered!')
            document.getElementById('registerButton').style.visibility = 'hidden';
            document.getElementById('loginButton').style.visibility = 'hidden';
            document.getElementById('logoutButton').style.visibility = 'visible';
           
        }
    })
    .catch(err => console.log(err))
}
