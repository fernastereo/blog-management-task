<script setup>
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
  <nav class="flex items-center justify-between border-t border-gray-300 py-3 mt-6">
    <div class="">
      <p class="text-sm text-gray-700">
        Showing page <span class="font-medium">{{ currentPage }}</span> of <span class="font-medium">{{ totalPages }}</span>
      </p>
    </div>
    <div class="flex flex-1 justify-end">
      <button @click="emitPrevPage" :disabled="currentPage === 1" class="text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md text-sm font-semibold">Prev</button>
      <button @click="emitNextPage" :disabled="currentPage === totalPages" class="text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md text-sm font-semibold ml-3">Next</button>
    </div>
  </nav>
</template>
