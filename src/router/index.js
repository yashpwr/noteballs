import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '../views/ViewNotes.vue'
import ViewStats from '../views/ViewStats.vue'
import EditNote from '../views/ViewEditNote.vue'
import ViewAuth from '../views/ViewAuth.vue'
import { useStoreAuth } from '../stores/storeAuth'

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
    path: '/auth',
    name: 'auth',
    component: ViewAuth
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

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();
  console.log();

  if(!storeAuth.user.id && to.name !== 'auth'){
    return { name: 'auth' }
  }

  if(storeAuth.user.id && to.name === 'auth'){
    return false;
  }
})

export default router