<template>
  <div id="app">
    <PasswordEvaluator />
  </div>
</template>

<script>
import PasswordEvaluator from "./components/PasswordEvaluator.vue";

export default {
  components: {
    PasswordEvaluator,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
