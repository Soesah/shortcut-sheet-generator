<script lang="ts" setup>
import { getMessage } from '@/core/validation';
import { FieldComposable, fieldProps } from './field.composable';
import Message from '@/components/common/Message.vue';
import CheckboxIcon from '../icons/CheckboxIcon.vue';
import CheckboxOutlineIcon from '../icons/CheckboxOutlineIcon.vue';

const {
  modelValue,
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
    type: Boolean,
    default: false,
  },
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

const { fieldValue, update, name } = FieldComposable<boolean>(
  modelValue as any,
  emit,
  label,
  prop,
);
</script>
<template>
  <div
    class="field field-switch"
    :class="[{ invalid: validation.$invalid && validation.$dirty }, styling]"
  >
    <label v-if="!hideLabel"></label>
    <label :class="type">
      <input
        class="hidden"
        type="checkbox"
        @change="update"
        v-model="fieldValue"
        :readonly="readonly"
        :value="modelValue"
        :disabled="disabled"
        :name="name"
      />
      <CheckboxIcon
        v-if="fieldValue"
        :width="20"
        :height="20"
        class="icon icon-checkbox-checked"
      ></CheckboxIcon>
      <CheckboxOutlineIcon
        v-if="!fieldValue"
        :width="20"
        :height="20"
        class="icon icon-checkbox-unchecked"
      ></CheckboxOutlineIcon>
      <span class="label-text" v-text="label"></span>
    </label>
    <message
      type="alert"
      :styling="messageStyling"
      :message="getMessage(validation)"
      :show="validation.$invalid && validation.$dirty"
      @dismiss="validation.$reset()"
    ></message>
  </div>
</template>
