<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/about" class="nav-item nav-link">About</router-link>
        <router-link to="/register" class="nav-item nav-link">Register</router-link>
        <router-link to="/login" class="nav-item nav-link">Login</router-link>
        <router-link to="/profile" class="nav-item nav-link">Profile</router-link>
        <router-link to="/work" class="nav-item nav-link">Work Page</router-link>
      </div>
    </nav>
  </template>  

  <script>
  export default {
    name: 'AppNavbar'
  }
  </script>
  
  <style scoped>
    .nav-item .router-link-active {
    font-weight: bold;
    color: #007bff; /* Bootstrap primary color */
    }
  </style>