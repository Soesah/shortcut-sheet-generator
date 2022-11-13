export default {
  mounted(el: any, binding: any) {
    setTimeout(() => {
      if (!el.focussed) {
        el.querySelector('input,textarea')[binding.value]();
        el.focussed = true;
      }
    }, 100);
  },
};
