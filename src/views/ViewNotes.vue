<template>
<div class="notes">

  <AddEditNote
    v-model="newNote"
    placeholder="Add a new note"
    ref="addEditNoteRef"
  >
    <template #buttons>
      <button
          :disabled="!newNote" 
          @click="addNote" 
          class="button is-link has-background-success"
        >Add New Note</button>
    </template>
  </AddEditNote>

  <Note
    v-for="note in storeNotes.notes" 
    :key="note.id"
    :note="note"
  />
</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Note from '../components/Notes/Notes.vue'
import AddEditNote from '../components/Notes/AddEditNote.vue'

import { useStoreNotes } from '../stores/storeNotes';

const storeNotes = useStoreNotes();

const newNote = ref('');
const addEditNoteRef = ref(null)

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
} 

watch( newNote, (newValue) => {
  if(newValue.length == 100){
    alert('only 100 characters allowed.')
  }
})
</script>
