import { computed, ComputedRef, PropType, Ref, ref, UnwrapRef } from 'vue';

export const fieldProps = {
  modelValue: {
    type: String as PropType<string | number | null>,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  prop: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  styling: {
    type: String,
  },
  messageStyling: {
    type: String,
    default: '',
  },
  validation: {
    type: Object,
    default: () => ({
      $invalid: false,
      $dirty: false,
      $touch: () => {
        return;
      },
      $reset: () => {
        return;
      },
      $flattenParams: () => [],
    }),
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
};

export const FieldComposable = <T>(
  initialValue: T,
  emit: (
    event:
      | 'update:modelValue'
      | 'input'
      | `key.${string}`
      | `key.ctrl.${string}`
      | 'enter'
      | 'escape',
    ...args: any[]
  ) => void,
  label: string,
  prop?: string,
): {
  fieldValue: Ref<UnwrapRef<T>>;
  update: () => void;
  enter: (evt: KeyboardEvent) => void;
  escape: (evt: KeyboardEvent) => void;
  key: (evt: KeyboardEvent) => void;
  name: ComputedRef<string>;
} => {
  const fieldValue = ref<T>(initialValue);

  const name = computed((): string =>
    prop ? `${prop.toLowerCase()}-${label.toLowerCase()}` : label.toLowerCase(),
  );

  const key = (evt: KeyboardEvent) => {
    emit('update:modelValue', fieldValue.value);
    const modifier = evt.ctrlKey ? 'ctrl.' : '';
    emit(`key.${modifier}${evt.key}`, fieldValue.value, evt.key);
  };

  const enter = (evt: KeyboardEvent) => {
    emit('enter', evt);
  };

  const escape = (evt: KeyboardEvent) => {
    emit('escape', evt);
  };

  const update = () => {
    emit('update:modelValue', fieldValue.value);
    emit('input', fieldValue.value);
  };

  return { fieldValue, update, enter, escape, key, name };
};
