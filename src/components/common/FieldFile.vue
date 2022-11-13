<script lang="ts" setup>
import { FieldComposable, fieldProps } from './field.composable';
import Message from '@/components/common/Message.vue';
import { getMessage } from '@/core/validation';
import { PropType, ref } from 'vue';

const props = defineProps({
  ...fieldProps,
  modelValue: {
    type: Object as PropType<File | null>,
    default: null,
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

const { name, fieldValue } = FieldComposable<File | null>(
  props.modelValue,
  emit,
  props.label,
  props.prop,
);

const input = ref<HTMLInputElement | null>(null);

const update = () => {
  let file = null;
  if (input.value && input.value.files) {
    file = input.value.files[0];
  }
  fieldValue.value = file;

  emit('update:modelValue', file);

  props.validation.$touch();
};
</script>
<template>
  <div
    class="field"
    :class="[
      { invalid: props.validation.$invalid && props.validation.$dirty },
      styling,
    ]"
  >
    <label v-if="!hideLabel">
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
    <input
      ref="input"
      :name="name"
      type="file"
      :disabled="props.disabled"
      :readonly="props.readonly"
      @change="update"
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
