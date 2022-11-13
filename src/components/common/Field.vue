<script lang="ts" setup>
import { FieldComposable, fieldProps } from './field.composable';
import Message from '@/components/common/Message.vue';
import { getMessage } from '@/core/validation';
import { watch } from 'vue';

const props = defineProps({
  ...fieldProps,
  type: {
    type: String,
    default: 'text',
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

const { fieldValue, update, enter, escape, key, name } = FieldComposable<
  string | number | null
>(props.modelValue, emit, props.label, props.prop);

watch(
  () => props.modelValue,
  (v) => {
    fieldValue.value = `${v}`;
  },
);
</script>
<template>
  <div
    class="field"
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
      >
    </label>
    <input
      :name="name"
      :placeholder="props.placeholder || props.label"
      :type="props.type"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :autocomplete="props.autocomplete"
      v-model="fieldValue"
      @change="update"
      @input="update"
      @keyup="key"
      @keydown.enter.exact="enter"
      @keydown.escape.exact="escape"
      @blur="props.validation.$touch()"
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
