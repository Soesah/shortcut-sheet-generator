<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Mutations } from '@/store';
import { Notification } from '@/models/notification';
import Message from './Message.vue';

const store = useStore();
const notifications = computed<Notification[]>(() => store.state.notifications);

const dismiss = (id: number) => {
  store.commit(Mutations.DismissNotification, id);
};
</script>
<template>
  <div class="notifications" v-if="notifications.length">
    <Message
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :message="notification.message"
      @dismiss="dismiss(notification.id)"
      show
    />
  </div>
</template>
<style scoped>
.notifications {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 400px;
  max-width: 400px;
}
</style>
