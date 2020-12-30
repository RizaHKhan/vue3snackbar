import { shallowMount } from "@vue/test-utils";
import Snackbar from "@/components/Snackbar.vue";

describe("Snackbar.vue", () => {
  it("should be hidden with no messages in store array", () => {
    const wrapper = shallowMount(Snackbar);
    wrapper.expect();
  });

  it("should show message for three seconds and then should disappear", () => {});
  it("should show next message in the array after three seconds", () => {});
});
