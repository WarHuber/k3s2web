<template>
    <div class="container flex-fill">
      <app-header />
      <app-navbar />
      <main class="my-4">
        <h2>Track Your Work</h2>
        <p>Here, you can start a new work session, pause it, and save your progress. Fill in the details below to begin.</p>
        
        <!-- Timer Area -->
        <div class="timer-area mb-3">
          <h4>Current Session Timer:</h4>
          <div id="timer" class="timer" style="font-size: 2em; font-weight: bold;">
            00:00:00
          </div>
        </div>
  
        <!-- New Work Session Form -->
        <form id="work-session-form" @submit.prevent="startSession">
          <div class="form-group">
            <label for="session-title">Session Title</label>
            <input type="text" class="form-control" id="session-title" v-model="session.title" placeholder="Enter session title">
          </div>
          <div class="form-group">
            <label for="session-description">Description</label>
            <textarea class="form-control" id="session-description" rows="3" v-model="session.description" placeholder="Describe the work session"></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="startSession">Start Session</button>
          <button type="button" class="btn btn-secondary" @click="pauseSession">Pause Session</button>
          <button type="button" class="btn btn-success" @click="saveSession">Save Progress</button>
        </form>
  
        <!-- Previous Sessions List -->
        <h3 class="mt-4">Previous Sessions</h3>
        <ul id="previous-sessions-list" class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in sessions" :key="item.id">
            <span>{{ item.title }}</span>
            <span>{{ item.description }}</span>
            <span class="badge badge-primary badge-pill">{{ formatDuration(item.length) }}</span>
          </li>
        </ul>
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
        session: {
          title: '',
          description: '',
          startTime: null,
          endTime: null,
          length: 0
        },
        sessions: []
      };
    },
    methods: {
      async startSession() {
        // Implementation for starting a session
      },
      async pauseSession() {
        // Implementation for pausing a session
      },
      async saveSession() {
        // Save session data to server
        try {
          await axios.post('http://localhost:3000/api/sessions', this.session);
          alert('Session saved successfully');
        } catch (error) {
          alert('Failed to save session: ' + error.response.data.error);
        }
      },
      async loadSessions() {
        // Load sessions from server
        try {
          const response = await axios.get('http://localhost:3000/api/sessions');
          this.sessions = response.data;
        } catch (error) {
          alert('Failed to load sessions: ' + error.response.data.error);
        }
      }
    },
    mounted() {
      this.loadSessions();
    }
  }
  </script>
  
  <style scoped>
  /* Additional styles specific to the WorkView */
  </style>
  