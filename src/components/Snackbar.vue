<template>
  <transition name="component-fade" @after-leave="checkForMoreSnacks">
    <div class="snackbar" v-if="currentSnack">
      <div class="snackbar__container">
        <p>{{ currentSnack }}</p>
        <button @click="closeSnackbar">Close Me</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  setup() {
    const timerInterval = 1500;
    const store = useStore();
    let timeoutToken = null;
    let snacks = computed(() => store.getters["GET_SNACKBAR_MESSAGES"]);
    let currentSnack = ref(null);

    // The event that triggers the Snackbar to initially appear.
    // Much like an EventBus emit
    store.subscribe(mutation => {
      // listen for this specific mutation call
      if (mutation.type === "ADD_SNACKBAR_MESSAGE") {
        // if there is already a timeoutToken do not proceed
        if (timeoutToken) return;

        // if no token, set the value to this settimeout function where we do:
        // 1. Set the current value to the [0] index of the snacks array.
        // 2. Remove that item from the snacks array in the store
        currentSnack.value = snacks.value[0];
        timeoutToken = setTimeout(() => {
          closeCurrentSnack();
        }, timerInterval);
      }
    });

    function closeCurrentSnack() {
      store.commit("DELETE_SNACKBAR_MESSAGE");
      currentSnack.value = null;
      timeoutToken = null;
    }

    function checkForMoreSnacks() {
      if (!snacks.value.length) {
        timeoutToken = null;
        currentSnack.value = null;
      } else {
        currentSnack.value = snacks.value[0];
        timeoutToken = setTimeout(() => {
          closeCurrentSnack();
        }, timerInterval);
      }
    }

    return {
      currentSnack,
      checkForMoreSnacks
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
