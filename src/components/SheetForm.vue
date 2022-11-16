<script lang="ts" setup>
import { PropType, reactive } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store';
import Field from '@/components/common/Field.vue';
import { Sheet } from '@/models/sheet.model';

const store = useStore();
const { data } = defineProps({
  data: {
    type: Object as PropType<{ sheet: Sheet; isAdd: boolean }>,
    required: true,
  },
});

let sheet = reactive<Sheet>({ ...data.sheet });

const emit = defineEmits(['close']);

// const $v = useVuelidate(userValidations, profile);

const submit = () => {
  if (sheet.id !== undefined) {
    store.dispatch(Actions.UpdateSheet, sheet);
  } else {
    store.dispatch(Actions.CreateSheet, sheet);
  }
  emit('close');
};
</script>
<template>
  <div class="drawer-content">
    <form class="form" @submit.prevent="submit">
      <h2>{{ data.isAdd ? 'Add' : 'Edit' }} Sheet</h2>
      <Field label="Description" v-model="sheet.description" />
      <div class="buttons">
        <button class="cancel" type="button">Cancel</button>
        <button class="confirm" type="submit">
          {{ data.isAdd ? 'Add' : 'Edit' }}
        </button>
      </div>
    </form>
  </div>
</template>
