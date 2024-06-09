<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <h2>About This Application</h2>
        <p>This application is designed to help individuals and teams track their work hours efficiently.</p>
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
  /* Additional styles specific to the AboutView */
  </style>
  