document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        password: document.getElementById('password').value
    };

    // check if user already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userExists = users.find(user => user.email === userData.email);
    if (userExists) {
        alert('User already exists');
        return;
    }

    // save to local storage
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('registration-form').reset();

    // redirect to login page
    window.location.href = 'login.html';
});
