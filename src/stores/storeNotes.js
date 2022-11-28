// stores/counter.js
import { defineStore } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
       notes: [
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
      ] 
    }
  },
  actions: {
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