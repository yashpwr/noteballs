// stores/counter.js
import { defineStore } from 'pinia'
import { db } from '../js/firebase';
import { collection, onSnapshot, setDoc, doc, deleteDoc  } from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes')

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
       notes: [] 
    }
  },
  actions: {

    async getNotes(){

      onSnapshot(notesCollectionRef, (querySnapshot) => {
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

    async addNote(newNoteContent){
      let id = new Date().getTime();

      const res = await setDoc(doc(notesCollectionRef, id.toString()), {
        content: newNoteContent
      });

      console.log(res);
    },
    async deleteNote(idToDelete){
      // this.notes = this.notes.filter(note => note.id !== idToDelete)
      await deleteDoc(doc(notesCollectionRef,idToDelete));

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