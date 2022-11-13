<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    type: String,
    default: 'alert',
  },
  message: {
    type: String,
    required: true,
  },
  styling: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['dismiss']);

const done = ref<boolean>(false);
const showing = ref<boolean>(false);

const visible = computed((): boolean => {
  return !done.value && (props.show || showing.value);
});

const icon = computed((): string => {
  switch (props.type) {
    case 'alert':
      return 'fire';
    case 'warning':
      return 'warning';
    case 'confirm':
      return 'ok';
    case 'info':
      return 'bubble';
  }
  return 'bubble';
});

watch(
  () => props.show,
  (val: boolean) => {
    showing.value = !val;
    // quickly when hiding
    if (!val) {
      done.value = !val;
    }
    setTimeout(
      () => {
        done.value = !val;
        showing.value = val;
      },
      val ? 0 : 500,
    );
  },
);

const state = computed((): string => {
  return `${props.type} ${props.styling} ${done.value ? 'done' : ''}`;
});

const dismiss = (evt: MouseEvent) => {
  done.value = true;
  emit('dismiss');
  evt.stopPropagation();
  evt.preventDefault();
};
</script>
<template>
  <div class="message" :class="state" v-if="visible">
    <span :class="`icon icon-${icon}`"></span>
    <span class="text" v-text="props.message"></span>
    <button
      type="button"
      class="dismiss icononly"
      @click="dismiss"
      tabindex="-1"
    >
      <span class="icon icon-remove"></span>
    </button>
  </div>
</template>
