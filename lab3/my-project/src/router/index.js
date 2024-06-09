import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../components/views/HomeView.vue';
import AboutView from '../components/views/AboutView.vue';
import LoginView from '../components/views/LoginView.vue';
import RegisterView from '../components/views/RegisterView.vue';
import ProfileView from '../components/views/ProfileView.vue';
import WorkView from '../components/views/WorkView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/work',
      name: 'Work',
      component: WorkView
    }
  ]
});
