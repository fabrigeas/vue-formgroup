<template>
  <div id="app">
    <div class="container">
      <h4>Below are examples of how the this component look like</h4>
      Text:{{ text }}<br />
      textarea: {{ textarea }}<br />
      Date:{{ date }}<br />
      Email:{{ email }}<br />
      Number:{{ number }}<br />
      Color:{{ color }}<br />
      Select: {{ select }}<br />

      <FormGroup
        label="Text"
        :model.sync="text"
        :attrs="{
          required: true
        }"
      >
      </FormGroup>

      <FormGroup label="Email:" :model.sync="email" :attrs="emailAttributes">
      </FormGroup>

      <FormGroup label="Textarea" type="textarea" :model.sync="textarea">
        {{ textarea }}
      </FormGroup>

      <FormGroup
        label="Date"
        type="date"
        :model.sync="date"
        :attrs="{ required: true }"
      >
      </FormGroup>

      <FormGroup label="Number" type="number" :model.sync="number"> </FormGroup>

      <FormGroup label="Color" type="color" :model.sync="color"> </FormGroup>

      <FormGroup type="select" label="Select" :model.sync="select">
        <option>Male</option>
        <option>Female</option>
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormGroup from "./components/FormGroup.vue";

export default Vue.extend({
  name: "App",
  components: {
    FormGroup
  },

  data() {
    return {
      text: "",
      email: "",
      textarea: "",
      select: "",
      date: "",
      number: "0",
      color: "#112233",
      emailAttributes: {
        placeholder: "Your email",
        pattern: "^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,})+$"
      }
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin: auto;
  max-width: 500px;
}
</style>
