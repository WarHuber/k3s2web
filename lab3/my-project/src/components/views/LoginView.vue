<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model="credentials.email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="credentials.password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </main>
      <app-footer />
    </div>
  </template>
  
  <script>
  import AppHeader from './common/AppHeader.vue';
  import AppNavbar from './common/AppNavbar.vue';
  import AppFooter from './common/AppFooter.vue';
  import axios from 'axios';
  
  export default {
    components: {
      AppHeader,
      AppNavbar,
      AppFooter
    },
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/api/login', this.credentials);
          this.$store.commit('setUser', response.data); // Store user data in Vuex
          this.$router.push('/profile'); // Navigate to profile page on successful login
        } catch (error) {
          alert('Failed to login: ' + error.response.data.error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles specific to the LoginView */
  </style>
  