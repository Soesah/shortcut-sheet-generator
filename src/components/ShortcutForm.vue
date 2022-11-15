<script lang="ts" setup>
import { PropType, reactive } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/store';
import { ShortCut } from '@/models/shortcut.model';
import Field from '@/components/common/Field.vue';
import FieldSwitch from '@/components/common/FieldSwitch.vue';

const store = useStore();
const { data } = defineProps({
  data: {
    type: Object as PropType<{ shortCut: ShortCut; isAdd: boolean }>,
    required: true,
  },
});

let shortCut = reactive<ShortCut>({ ...data.shortCut });

// const $v = useVuelidate(userValidations, profile);

const submit = () => {
  store.dispatch(Actions.UpdateShortcut, shortCut);
};
</script>
<template>
  <div class="drawer-content">
    <h2>Edit Shortcut</h2>
    <form class="form" @submit.prevent="submit">
      <Field label="Description" v-model="shortCut.description" />
      <FieldSwitch label="CTRL" v-model="shortCut.controlKey" />
      <FieldSwitch label="ALT" v-model="shortCut.altKey" />
      <FieldSwitch label="SHIFT" v-model="shortCut.shiftKey" />
      <FieldSwitch label="CMD" v-model="shortCut.commandKey" />
      <Field label="Key" v-model="shortCut.key" />
      <Field label="Location" v-model="shortCut.location" />
      <div class="buttons">
        <button class="cancel" type="button">Cancel</button>
        <button class="confirm" type="submit">Edit</button>
      </div>
    </form>
  </div>
</template>
