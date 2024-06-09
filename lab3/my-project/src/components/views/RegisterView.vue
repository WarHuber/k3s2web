<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Enter name">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <select class="form-control" id="gender" v-model="user.gender">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input type="date" class="form-control" id="dob" v-model="user.dob">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="user.password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </main>
      <app-footer />
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import AppHeader from './common/AppHeader.vue';
  import AppNavbar from './common/AppNavbar.vue';
  import AppFooter from './common/AppFooter.vue';
  
  export default {
    components: {
      AppHeader,
      AppNavbar,
      AppFooter
    },
    data() {
      return {
        user: {
          name: '',
          email: '',
          gender: '',
          dob: '',
          password: ''
        }
      };
    },
    methods: {
      ...mapActions('user', ['register'])
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles specific to the RegisterView */
  </style>
  