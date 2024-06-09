<template>
  <div class="d-flex flex-column min-vh-100">
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
        <form id="work-session-form">
          <div class="alert alert-info" role="alert" v-if="currentSession">
            <strong>Session in Progress:</strong> {{ currentSession.title }} - {{ currentSession.description }}
          </div>
          <div class="form-group" v-if="!currentSession">
            <label for="session-title">Session Title</label>
            <input type="text" class="form-control" v-model="sessionTitle" id="session-title" placeholder="Enter session title">
          </div>
          <div class="form-group" v-if="!currentSession">
            <label for="session-description">Description</label>
            <textarea class="form-control" v-model="sessionDescription" id="session-description" rows="3" placeholder="Describe the work session"></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="startSession">Start Session</button>
          <button type="button" class="btn btn-secondary" v-if="currentSession" @click="pauseSession">Pause Session</button>
          <button type="button" class="btn btn-success" v-if="currentSession" @click="saveSession">Save Progress</button>
        </form>

        <!-- Previous Sessions List -->
        <h3 class="mt-4">Previous Sessions</h3>
        <ul id="previous-sessions-list" class="list-group">
          <li v-for="session in previousSessions" :key="session.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ session.title }}</span>
            <span>{{ session.description }}</span>
            <span class="badge badge-primary badge-pill">{{ formatTime(session.length) }}</span>
          </li>
        </ul>
      </main>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '../common/AppHeader.vue';
import AppNavbar from '../common/AppNavbar.vue';
import AppFooter from '../common/AppFooter.vue';
import SessionModel from '../../js/model/SessionModel.js';

export default {
  components: {
    AppHeader,
    AppNavbar,
    AppFooter
  },
  data() {
    return {
      sessionTitle: '',
      sessionDescription: '',
      currentSession: null,
      previousSessions: [],
      timer: null
    };
  },
  methods: {
    startSession() {
      const title = this.sessionTitle || 'Untitled';
      const description = this.sessionDescription || 'No description';
      const session = new SessionModel(title, description);
      session.start();
      this.currentSession = session;
      this.previousSessions.push(session);
      this.sessionTitle = '';
      this.sessionDescription = '';
    },
    pauseSession() {
      if (this.currentSession) {
        this.currentSession.pause();
      }
    },
    saveSession() {
      if (this.currentSession) {
        this.currentSession.save();
        this.currentSession = null;
      }
    },
    stopTimer() {
      if (this.timer) {
        this.timer.pause();
      }
    },
    formatTime(ms) {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    loadPreviousSessions() {
      const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
      this.previousSessions = storedSessions.map(session => new SessionModel(session.title, session.description));
    }
  },
  mounted() {
    this.loadPreviousSessions();
  }
};
</script>

<style scoped>
/* Additional styles specific to the WorkView */
</style>
