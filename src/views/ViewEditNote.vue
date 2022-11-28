<template>
  <div class="edit-notes">
    <AddEditNote
      bgColor="link"
      v-model="noteContent"
      ref="addEditNoteRef"
      label="Edit Note"
  >
    <template #buttons>
      <button
         @click="$router.back()"
          class="button is-link has-light"
        >Cancel</button>
      <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
        >Save Note</button>
    </template>
  </AddEditNote>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import AddEditNote from '../components/Notes/AddEditNote.vue';
  
  const noteContent = ref('')
</script>