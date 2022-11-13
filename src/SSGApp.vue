<script lang="ts" setup>
import Modal from '@/components/common/Modal.vue';
import Drawer from '@/components/common/Drawer.vue';
import Notifications from '@/components/common/Notifications.vue';
</script>
<template>
  <div>
    <header>
      <h1>Shortcut Sheets</h1>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>Carl Giesberts - 2022</footer>
    <Drawer></Drawer>
    <Modal></Modal>
    <Notifications />
  </div>
</template>
<style src="@/css/ssg.less" lang="less"></style>
