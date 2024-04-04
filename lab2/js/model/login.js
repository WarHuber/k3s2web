document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // check if user exists
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === userData.email && user.password === userData.password);
    if (user) {
        // set current user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // redirect to profile page
        window.location.href = 'profile.html';
    }
    else {
        alert('Invalid email or password');
    }
});
