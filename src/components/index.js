import Vue from 'vue';
import formGroup from './formGroup.vue';
const Components = {
  formGroup,
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
