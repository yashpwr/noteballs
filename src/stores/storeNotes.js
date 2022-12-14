// stores/counter.js
import { defineStore } from 'pinia'
import { db } from '../js/firebase';
import { 
  collection, onSnapshot, 
  doc, addDoc,
  deleteDoc, updateDoc, 
  query, orderBy, limit
} from 'firebase/firestore';
import { useStoreAuth } from '../stores/storeAuth';

let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
       notes: [],
       notesLoaded: false 
    }
  },
  actions: {

    init(){
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes()
    },

    async getNotes(){
      this.notesLoaded = false;
      
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
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
          this.notesLoaded = true;
      }, error => {
        console.log('error.message : ', error.message);
      });
    },

    clearNotes(){
      this.notes = [];
      if (getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listner

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