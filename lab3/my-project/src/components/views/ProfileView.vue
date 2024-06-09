<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <h2>User Profile</h2>
        <table class="table" id="profile-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{{ user.gender }}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{{ user.dob }}</td>
            </tr>
          </tbody>
        </table>
      </main>
      <app-footer />
    </div>
  </template>
  
  <script>
  import AppHeader from './common/AppHeader.vue';
  import AppNavbar from './common/AppNavbar.vue';
  import AppFooter from './common/AppFooter.vue';
  
  export default {
    components: {
      AppHeader,
      AppNavbar,
      AppFooter
    },
    computed: {
      user() {
        return this.$store.state.user || { name: '-', email: '-', gender: '-', dob: '-' }; // Default values if no user is logged in
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles specific to the ProfileView */
  </style>
  