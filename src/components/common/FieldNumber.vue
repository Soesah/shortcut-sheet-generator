<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getMessage } from '@/core/validation';
import { FieldComposable, fieldProps } from './field.composable';
import Message from '@/components/common/Message.vue';

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: Number,
    default: 0,
  },
  placeholder: {
    type: String,
  },
  step: {
    type: String,
    default: '1',
  },
  pattern: {
    type: String,
    default() {
      return '\-?[0-9]+([.][0-9]{1,2})?';
    },
  },
});

const emit = defineEmits([
  'update:modelValue',
  'enter',
  'input',
  'escape',
  `key.${String}`,
  `key.ctrl.${String}`,
]);

const { fieldValue, enter, escape, name } = FieldComposable<String>(
  `${props.modelValue}`,
  emit,
  props.label,
  props.prop,
);

const focussed = ref<boolean>(false);
const decimalPoint = computed(() => {
  return props.step.substring(props.step.indexOf('.')).length - 1;
});

watch(
  () => props.modelValue,
  (v) => {
    fieldValue.value = `${v}`;
    format();
  },
);

onMounted(() => {
  fieldValue.value = `${props.modelValue}`;
  format();
});

const update = () => {
  emit('update:modelValue', formatValue(fieldValue.value as string));
  emit('input', formatValue(fieldValue.value as string));
};

const formatValue = (v: string) => parseFloat(v);

const format = () => {
  const val = formatValue(fieldValue.value as string);

  if (isNaN(val)) {
    fieldValue.value = '';
  } else if (!focussed.value) {
    fieldValue.value = val.toFixed(decimalPoint.value);
  }
};

const focus = () => {
  focussed.value = true;
};

const blur = () => {
  focussed.value = false;
  format();
  props.validation.$touch();
};

const key = (evt: KeyboardEvent) => {
  emit('update:modelValue', formatValue(fieldValue.value as string));
  const modifier = evt.ctrlKey ? 'ctrl.' : '';
  emit(`key.${modifier}${evt.key}`, fieldValue.value, evt.key);
};

const upKey = (evt: Event) => {
  if (props.disabled || props.readonly) {
    return;
  }
  fieldValue.value = parseFloat(
    `${parseFloat(`${fieldValue.value}`) + parseFloat(props.step)}`,
  ).toFixed(decimalPoint.value);
  format();
  update();
  evt.stopPropagation();
};

const downKey = (evt: Event) => {
  if (props.disabled || props.readonly) {
    return;
  }
  fieldValue.value = parseFloat(
    `${parseFloat(`${fieldValue.value}`) - parseFloat(props.step)}`,
  ).toFixed(decimalPoint.value);
  format();
  update();
  evt.stopPropagation();
};
</script>
<template>
  <div
    class="field field-number"
    :class="[
      { invalid: props.validation.$invalid && props.validation.$dirty },
      props.styling,
    ]"
  >
    <label v-if="!props.hideLabel">
      {{ props.label }}
      <sup
        v-if="
          props.validation &&
          props.validation.$invalid &&
          !props.validation.$dirty
        "
        >*</sup
      ></label
    >
    <input
      type="text"
      :name="name"
      :placeholder="props.placeholder || props.label"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :pattern="props.pattern"
      :autocomplete="props.autocomplete"
      v-model="fieldValue"
      @change="update"
      @input="update"
      @keyup="key"
      @keydown.up="upKey($event)"
      @keydown.down="downKey($event)"
      @keydown.enter.exact="enter"
      @keydown.escape.exact="escape"
      @focus="focus"
      @blur="blur"
    />
    <Message
      type="alert"
      :styling="props.messageStyling"
      :message="getMessage(props.validation)"
      :show="props.validation.$invalid && props.validation.$dirty"
      @dismiss="props.validation.$reset()"
    ></Message>
  </div>
</template>
