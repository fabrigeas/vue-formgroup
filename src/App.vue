<template>
  <div id="app">
    {{name}}
      <formGroup 
      :label="'Name'"
      :invalid="name.length < 3"
      :invalidFeedback="'Please fill this field!!'"
      :validFeedback="'looks good!'"
      :model.sync="name"/>
  </div>
</template>

<script>
import formGroup from './components/formGroup.vue'

export default {
  name: 'App',
  data: ()=>({
    name: ""
  }),
  components: {
    formGroup
  }
}
</script>

<style>
#app {
  padding: 2rem;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
