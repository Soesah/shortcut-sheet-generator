<script lang="ts" setup>
import { PropType } from 'vue';
import { Option } from '../../models/option';
import { FieldComposable, fieldProps } from './field.composable';
import { getMessage } from '@/core/validation';
import Message from '@/components/common/Message.vue';

const {
  modelValue,
  type,
  label,
  hideLabel,
  prop,
  disabled,
  readonly,
  validation,
  styling,
  messageStyling,
} = defineProps({
  ...fieldProps,
  modelValue: {
    type: String,
    default: 0,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
  },
  options: {
    type: Array as PropType<Option<string>[]>,
    required: true,
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

const { fieldValue, update } = FieldComposable<String>(
  modelValue,
  emit,
  label,
  prop,
);
</script>
<template>
  <div
    class="field field-options"
    :class="[{ invalid: validation.$invalid && validation.$dirty }, styling]"
  >
    <label v-if="!hideLabel">
      {{ label }}
      <sup v-if="validation && validation.$invalid && !validation.$dirty"
        >*</sup
      ></label
    >
    <label
      :class="type"
      v-for="option in options"
      :key="option.name"
      :for="`${option.name}-opt`"
    >
      <input
        :id="`${option.name}-opt`"
        type="radio"
        @change="update"
        v-model="fieldValue"
        :readonly="readonly"
        :value="option.value"
        :disabled="disabled"
        :name="label"
      />
      <label
        class="radio-option"
        :class="{ 'radio-option-selected': fieldValue === option.value }"
      ></label>
      <span>{{ option.name }}</span>
    </label>
    <Message
      type="alert"
      :styling="messageStyling"
      :message="getMessage(validation)"
      :show="validation.$invalid && validation.$dirty"
      @dismiss="validation.$reset()"
    ></Message>
  </div>
</template>
