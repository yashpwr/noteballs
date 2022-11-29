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
  
  <progress 
    v-if="!storeNotes.notesLoaded"
    class="progress is-small is-success" 
    max="100"/>

  <template v-else>
    <Note
      v-for="note in storeNotes.notes" 
      :key="note.id"
      :note="note"
    />
  </template>

  <div
    class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6" 
    v-if="!storeNotes.notes.length">
    No notes here yet...
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '../components/Notes/Notes.vue'
import AddEditNote from '../components/Notes/AddEditNote.vue'
import { useWatchCharacters } from '../use/useWatchCharacters'

import { useStoreNotes } from '../stores/storeNotes';

const storeNotes = useStoreNotes();

const newNote = ref('');
const addEditNoteRef = ref(null)

const addNote = () => {
  storeNotes.addNote(newNote.value);
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
} 

useWatchCharacters(newNote)
</script>
