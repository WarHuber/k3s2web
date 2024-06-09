<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <h2 class="mb-3">Track Your Work Hours with Ease</h2>
        <p>This application is designed to simplify the process of tracking work hours for both individuals and teams. With a user-friendly interface, you can easily register, log in, and start managing your work sessions today.</p>
        <p>Explore our application:</p>
        <ul>
          <li><router-link to="/register">Register now</router-link> to start tracking your work hours.</li>
          <li>If you already have an account, simply <router-link to="/login">log in</router-link>.</li>
          <li>Learn more about this tool on our <router-link to="/about">About page</router-link>.</li>
        </ul>
      </main>
      <app-footer />
    </div>
  </template>
  
  <script>
  import AppHeader from '../common/AppHeader.vue';
  import AppNavbar from '../common/AppNavbar.vue';
  import AppFooter from '../common/AppFooter.vue';
  
  export default {
    components: {
      AppHeader,
      AppNavbar,
      AppFooter
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles specific to the HomeView */
  </style>
  