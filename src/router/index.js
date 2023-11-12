import { createRouter, createWebHistory } from 'vue-router';
import CityList from '../components/CityList.vue';
import AddCity from '../components/AddCity.vue';

const routes = [
  { path: '/', component: CityList },
  { path: '/add-city', component: AddCity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
