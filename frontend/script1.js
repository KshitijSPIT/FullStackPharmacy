// Signup functionality
// Signup functionality
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Store user data in local storage
    localStorage.setItem(username, password);
    alert('Account created successfully! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
});

// Login functionality
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if user exists in local storage
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        alert('Login successful!');
        // Redirect to home page or dashboard
        window.location.href = 'welcome.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});