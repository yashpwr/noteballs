<template>
<div class="notes">

  <div class="card has-background-success-dark p-4 mb-5">

    <div class="field">
      <div class="control">
        <textarea 
          v-model="newNote" 
          class="textarea" 
          placeholder="Add a new note"
          ref="newNoteRef"
        />
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          :disabled="!newNote" 
          @click="addNote" 
          class="button is-link has-background-success"
        >Add New Note</button>
      </div>
    </div>
  </div>

  
  <Note
    v-for="note in storeNotes.notes" 
    :key="note.id"
    :note="note"
    @deleteClicked="deleteNote"
  />
</div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '../components/Notes/Notes.vue'
import { useStoreNotes } from '../stores/storeNotes';

const storeNotes = useStoreNotes();

const newNote = ref('');
const newNoteRef = ref('');

const addNote = () => {
  let id = new Date().getTime();

  let note = {
    id: id.toString(),
    content: newNote.value
  }

  notes.value.unshift(note);
  newNote.value = "";
  newNoteRef.value.focus()
} 

const deleteNote = idToDelete => {
  notes.value = notes.value.filter(note => {
    return note.id !== idToDelete
  })
}
</script>
