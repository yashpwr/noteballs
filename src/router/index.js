import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '../views/ViewNotes.vue'
import ViewStats from '../views/ViewStats.vue'
import EditNote from '../views/ViewEditNote.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-notes',
    component: EditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router