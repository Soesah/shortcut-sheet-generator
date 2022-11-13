export default {
  mounted(el: Element) {
    el.innerHTML = (el.textContent || '').replace(
      /(.*\d)([a-z]{2})\s/g,
      `$1<span class="sup">$2</span> `,
    );
  },
};
