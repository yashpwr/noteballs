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
    v-for="note in notes" 
    :key="note.id"
    :note="note"
  />
</div>
</template>

<script setup>
import { ref } from 'vue';
import Note from '../components/Notes/Notes.vue'

const newNote = ref('');
const newNoteRef = ref('');


const notes = ref([
  {
    id: 1,
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto, recusandae provident optio illo dolor rerum qui in, nihil eligendi consectetur reiciendis, non aut officia tempore cumque ipsum consequuntur quos.",
  },
  {
    id: 2,
    content: "222222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto, recusandae provident optio illo dolor rerum qui in, nihil eligendi consectetur reiciendis, non aut officia tempore cumque ipsum consequuntur quos.",
  },
  {
    id: 3,
    content: "33333333333 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto, recusandae provident optio illo dolor rerum qui in, nihil eligendi consectetur reiciendis, non aut officia tempore cumque ipsum consequuntur quos.",
  }
]);

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
</script>
