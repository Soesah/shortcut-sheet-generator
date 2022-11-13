<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue';
import { FieldComposable, fieldProps } from './field.composable';
import { getMessage } from '@/core/validation';
import { Option } from '@/models/option';
import Message from '@/components/common/Message.vue';

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: [String, Number, () => null], //Object as PropType<String | Number | null>, // causes complaints about input
    default: '',
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
  },
  options: {
    type: Array as PropType<Option<string | null | number>[]>,
    default: () => [],
  },
  showNull: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'enter',
  'input',
  'escape',
  `key.${String}`,
]);

const { fieldValue, update, name } = FieldComposable<string | number | null>(
  props.modelValue as any,
  emit,
  props.label,
  props.prop,
);

const isOpen = ref<boolean>(false);
const focusIndex = ref<number>(-1);

const fieldValueName = computed(() => {
  const item = props.options.find((v) => v.value === fieldValue.value);
  return fieldValue.value && item ? item.name : `[${name.value}]`;
});

const updateValue = () => {
  if (props.options.length) {
    const item = props.options.find((o) => o.value === props.modelValue);

    fieldValue.value = item ? item.value : null;
  }
};

watch(() => props.modelValue, updateValue);

onMounted(() => {
  updateValue();
  window.setTimeout(updateValue.bind(this), 50);
});

const open = () => {
  isOpen.value = true;
};

const close = (_: any, to = 150) => {
  setTimeout(() => {
    isOpen.value = false;
  }, to);
};

const choose = (evt: Event, option?: Option<string | number | null>) => {
  if (!option) {
    option = props.options[focusIndex.value];
  }

  fieldValue.value = option.value;
  update();
  close(null, 0);
  evt.stopPropagation();
};

const down = () => {
  if (!isOpen.value) {
    open();
  }
  focusIndex.value += 1;
};

const up = () => {
  focusIndex.value -= 1;
};

const stopping = (evt: Event) => {
  evt.stopImmediatePropagation();
  return false;
};
</script>
<template>
  <div
    class="field field-select"
    :class="[
      { invalid: props.validation.$invalid && props.validation.$dirty },
      props.styling,
      { open: isOpen },
    ]"
    @click.stop="stopping"
  >
    <label v-if="props.label">
      {{ props.label }}
      <sup v-if="props.validation && props.validation.$invalid">*</sup></label
    >
    <input
      type="text"
      :value="fieldValueName"
      readonly
      :disabled="props.disabled"
      @click="open"
      @blur="close"
      @keydown.stop.down="down"
      @keydown.stop.up="up"
      @keydown.stop.enter="choose($event)"
    />
    <ul class="options" v-if="isOpen">
      <li
        v-for="(option, index) in options"
        :key="index"
        v-text="option.name"
        @click.stop="choose($event, option)"
        :class="{ focussed: index === focusIndex }"
      />
    </ul>
    <Message
      type="alert"
      :styling="props.messageStyling"
      :message="getMessage(props.validation)"
      :show="props.validation.$invalid && props.validation.$dirty"
      @dismiss="props.validation.$reset()"
    ></Message>
  </div>
</template>
