<template>
  <div class="hello">
    <button @click="addMessage">Add Snackbar Message</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  name: "HelloWorld",
  setup() {
    const store = useStore();
    let count = ref(0);

    function addMessage() {
      let message = `This is the ${count.value} message`;
      store.commit("ADD_SNACKBAR_MESSAGE", message);
      count.value++;
    }

    return { addMessage };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
