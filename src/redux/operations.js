import { createAsyncThunk } from '@reduxjs/toolkit';
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

export  const createContact = createAsyncThunk(
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

