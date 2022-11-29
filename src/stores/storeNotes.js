// stores/counter.js
import { defineStore } from 'pinia'
import { db } from '../js/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
       notes: [] 
    }
  },
  actions: {

    async getNotes(){

      onSnapshot(collection(db, "notes"), (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content
          }
          notes.push(note)
        });

        this.notes = notes;
      });

      //later on
      // unsubscribe()
    },

    addNote(newNoteContent){
      let id = new Date().getTime();
      let note = {
        id: id.toString(),
        content: newNoteContent
      }
      
      this.notes.unshift(note);
    },
    deleteNote(idToDelete){
      this.notes = this.notes.filter(note => note.id !== idToDelete)
    },
    updateNote(id, content){
      let index = this.notes.findIndex(note =>  note.id == id )
      this.notes[index].content = content;  
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter( note => note.id == id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharacterCount: (state) => {
      let count = 0;
      state.notes.forEach(note => {
        count +=  note.content.length
      });
      return count;
    }
  }
})