import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const API = 'https://64dbb7d2593f57e435b15603.mockapi.io/contacts';

export const fetchContactsDataThunk = createAsyncThunk(
  'phonebook/fetchContactsDataThunk',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${API}`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createContact = createAsyncThunk(
  'phonebook/createContact',
  async (data, thunkApi) => {
    try {
      const res = await axios.post(`${API}`, data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'phonebook/removeContact',
  async (contactId, thunkApi) => {
    try {
      await axios.delete(`${API}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);



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
        state.isLoading = true;
        state.error = null;
    })
    .addCase(fetchContactsDataThunk.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.contacts.items = action.payload;
    })
    .addCase(fetchContactsDataThunk.rejected, (state,action) =>{
        state.isLoading = false;
        state.error = action.payload;
    })
    .addCase(createContact.fulfilled, (state,action) =>{
      state.isLoading = false;
      state.contacts.items.push(action.payload)
    })
    .addCase(removeContact.fulfilled, (state,action) =>{
      state.isLoading = false;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.id !== action.payload
      )
    })
});

export const { filteredContacts } = phoneBookSlice.actions;
export default phoneBookSlice.reducer;
