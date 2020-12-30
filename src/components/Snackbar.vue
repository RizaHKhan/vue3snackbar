<template>
  <transition name="component-fade" @after-leave="checkForMoreSnacks">
    <div class="snackbar" v-if="currentSnack">
      <div class="snackbar__container">
        <p>{{ currentSnack }}</p>
        <button @click="closeCurrentSnack">Close Me</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  setup() {
    const timerInterval = 3000;
    const store = useStore();
    let timeoutToken = ref(null);
    let snacks = computed(() => store.getters["GET_SNACKBAR_MESSAGES"]);
    let currentSnack = ref(null);

    store.subscribe(mutation => {
      if (mutation.type === "ADD_SNACKBAR_MESSAGE") {
        if (currentSnack.value) return;

        currentSnack.value = snacks.value[0];
        timeoutToken.value = setTimeout(() => {
          closeCurrentSnack();
        }, timerInterval);
      }
    });

    function closeCurrentSnack() {
      clearTimeout(timeoutToken.value);
      store.commit("DELETE_SNACKBAR_MESSAGE");
      currentSnack.value = null;
    }

    function checkForMoreSnacks() {
      if (snacks.value.length) {
        currentSnack.value = snacks.value[0];
        timeoutToken.value = setTimeout(() => {
          closeCurrentSnack();
        }, timerInterval);
      }
    }

    return {
      currentSnack,
      checkForMoreSnacks,
      closeCurrentSnack
    };
  }
};
</script>

<style lang="scss" scoped>
.snackbar {
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 500px;
  border: solid 2px red;
  padding: 1rem;
  border-radius: 5px;

  &__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 30px;
  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
