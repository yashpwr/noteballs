// stores/counter.js
import { defineStore } from 'pinia'
import { db } from '../js/firebase';
import { 
  collection, onSnapshot, 
  doc, addDoc,
  deleteDoc, updateDoc, 
  query, orderBy, limit
} from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));


export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
       notes: [] 
    }
  },
  actions: {

    async getNotes(){

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            date: doc.data().date,
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

      const docRef = await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date: new Date().getTime()
      });
    },
    async deleteNote(idToDelete){
      // this.notes = this.notes.filter(note => note.id !== idToDelete)
      await deleteDoc(doc(notesCollectionRef,idToDelete));

    },
    async updateNote(id, content){
      // let index = this.notes.findIndex(note =>  note.id == id )
      // this.notes[index].content = content;
      
      await updateDoc(doc(notesCollectionRef,id), {
        content: content
      });
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