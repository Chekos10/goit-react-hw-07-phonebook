import { createSlice } from '@reduxjs/toolkit';
import  { createContact, fetchContactsDataThunk, removeContact } from './operations';

const initialState = {
  contacts:{
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};


const phoneBookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    filteredContacts:(state, action) =>{
      state.filter = action.payload;
    }
  },
  extraReducers: builder => 
  builder
    .addCase(fetchContactsDataThunk.pending, (state)=>{
        state.contacts.isLoading = true;
        state.contacts.error = null;
    })
    .addCase(fetchContactsDataThunk.fulfilled, (state,action)=>{
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
    })
    .addCase(fetchContactsDataThunk.rejected, (state,action) =>{
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
    })
    .addCase(createContact.pending, (state,action) =>{
      state.contacts.isLoading = true;
      state.contacts.error = null
    })
    .addCase(createContact.fulfilled, (state,action) =>{
      state.contacts.isLoading = false;
      state.contacts.items.push(action.payload)
    })
    .addCase(createContact.rejected, (state,action) =>{
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    })
    .addCase(removeContact.pending, (state, action) =>{
      state.contacts.isLoading = true;
      state.contacts.error = null;
    })
    .addCase(removeContact.fulfilled, (state,action) =>{
      state.contacts.isLoading = false;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      )
    })
    .addCase(removeContact.rejected , (state, action) =>{
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
    })
});

export const { filteredContacts } = phoneBookSlice.actions;
export default phoneBookSlice.reducer;
