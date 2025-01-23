<script setup>
  import ButtonSolid from './ButtonSolid.vue'
  import { defineProps, defineEmits } from 'vue'

  const { currentPage, totalPages } = defineProps(['currentPage', 'totalPages'])

  const emit = defineEmits(['nextPage', 'prevPage'])

  const emitPrevPage = () => {
    emit('prevPage')
  }

  const emitNextPage = () => {
    emit('nextPage')
  }
</script>
<template>
  <nav class="flex items-center justify-between border-t border-gray-500 py-3">
    <div class="">
      <p class="text-sm text-gray-700">
        Showing page <span class="font-medium">{{ currentPage }}</span> of <span class="font-medium">{{ totalPages }}</span>
      </p>
    </div>
    <div class="flex flex-1 justify-end">
      <ButtonSolid @click="emitPrevPage" :disabled="currentPage === 1">Prev</ButtonSolid>
      <ButtonSolid @click="emitNextPage" :disabled="currentPage === totalPages" class="ml-3">Next</ButtonSolid>
    </div>
  </nav>
</template>
