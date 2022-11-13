let handler: any = null;
export default {
  mounted(el: Element, binding: any, vNode: any) {
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    handler = (e: any) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
        // e.stopPropagation();
        // e.preventDefault();
      }
    };
    // add Event Listeners
    document.body.addEventListener('mousedown', handler);
  },
  unmounted(el: Element, binding: any) {
    // Remove Event Listeners
    document.body.removeEventListener('mousedown', handler);
    handler = null;
  },
};
