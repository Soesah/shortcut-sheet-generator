<script lang="ts" setup>
import { watch } from 'vue';
import { FieldComposable, fieldProps } from './field.composable';
import Message from '@/components/common/Message.vue';
import { getMessage } from '@/core/validation';

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
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

const { fieldValue, update, enter, escape, key, name } =
  FieldComposable<string>(props.modelValue, emit, props.label, props.prop);

watch(
  () => props.modelValue,
  (v) => {
    fieldValue.value = `${v}`;
  },
);
</script>
<template>
  <div
    class="field field-long"
    :class="[
      { invalid: props.validation.$invalid && props.validation.$dirty },
      props.styling,
    ]"
  >
    <label v-if="!props.hideLabel">
      {{ label }}
      <sup
        v-if="
          props.validation &&
          props.validation.$invalid &&
          !props.validation.$dirty
        "
        >*</sup
      ></label
    >
    <textarea
      :name="name"
      :placeholder="props.placeholder || props.label"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :autocomplete="props.autocomplete"
      v-model="fieldValue"
      @input="update"
      @keyup="key"
      @keydown.enter.exact="enter"
      @keydown.escape.exact="escape"
      @blur="props.validation.$touch()"
    ></textarea>
    <Message
      type="alert"
      :styling="props.messageStyling"
      :message="getMessage(props.validation)"
      :show="props.validation.$invalid && props.validation.$dirty"
      @dismiss="props.validation.$reset()"
    ></Message>
  </div>
</template>
