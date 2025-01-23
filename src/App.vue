<script setup>
  import NavBar from './components/NavBar.vue'
  import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <NavBar />
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>

</style>
