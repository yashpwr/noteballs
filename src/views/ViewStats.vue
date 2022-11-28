<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of  Notes</td>
          <td>{{storeNotes.totalNotesCount}}</td> 
        </tr>
        <tr>
          <td>Number of  Character (of all notes)</td>
          <td>{{storeNotes.totalCharacterCount}}</td> 
        </tr>
      </tbody>
    </table>

    <input v-autofocus class="input" type="text" placeholder="Do you love noteballs? ">
  </div>
</template>

<script setup>
  import { useStoreNotes } from '../stores/storeNotes';
  import { vAutofocus } from '../directives/vAutofocus';

  const storeNotes = useStoreNotes();
</script>