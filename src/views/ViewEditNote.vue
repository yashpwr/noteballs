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
          class="button is-link has-light mr-2"
        >Cancel</button>
      <button
          @click="handleSaveClicked"
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
  import { useStoreNotes } from '../stores/storeNotes';
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const storeNotes = useStoreNotes()

  const noteContent = ref('')
  noteContent.value = storeNotes.getNoteContent(route.params.id.toString())


  const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent.value)
  }
</script>