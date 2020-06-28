import Vue from "vue";
import FormGroup from "./FormGroup.vue";
const Components = {
  FormGroup
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
