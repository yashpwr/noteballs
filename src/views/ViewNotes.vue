<template>
<div class="notes">

  <div class="card has-background-success-dark p-4 mb-5">

    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a new note"/>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-link has-background-success">Add New Note</button>
      </div>
    </div>
  </div>

  <div v-for="note in notes" :key="note.id" class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{note.content}}
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

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
])
</script>
