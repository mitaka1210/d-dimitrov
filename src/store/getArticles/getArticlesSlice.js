import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
 validateArticles
} from "../../helperMethods/checkArticleSectionNotNull/checkArticleSectionNotNull";

export const fetchArticles = createAsyncThunk('getArticles', async () => {
 const response = await fetch('/api/getArticles');
 if ( !response.ok) {
  console.error('API Error:', response.statusText);
  throw new Error('Failed to fetch articles');
 }
 return await response.json();
});

const articlesSlice = createSlice({
 name: 'articles',
 initialState: {
  isLoading: false,
  data: [],
  error: false,
  status: 'idle',
 },
 reducers: {
  getAll(state, action) {
   state.todo.push(action.payload);
  },
  add(state, action) {
   state.data.push(action.payload);
  },
 },
 extraReducers: (builder) => {
  builder.addCase(fetchArticles.pending, (state, action) => {
   state.status = 'loading';
   state.isLoading = true;
  });
  builder.addCase(fetchArticles.fulfilled, (state, action) => {
   state.isLoading = false;
   let articlesArr = [];
   state.data = validateArticles(action.payload);
   console.log("pesho", state.data);
   state.status = 'succeeded';
   if (action.payload.error === undefined){
    for (let i = 0; i < state.data.length; i++) {
     let createArticleDate = new Date(state.data[i].createData).toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
     });
     articlesArr.push({
      create_article_date: createArticleDate,
      status: state.data[i].status,
      id: state.data[i].id,
      title: state.data[i].title,
      sections: state.data[i].sections,
      images: state.data[i].images,
     });
    }
    //? return last created article first
    state.data = articlesArr;
   }else {
    state.status = 'failed';
    state.error = true;
    state.error = action.payload.error;
   }
  });
  builder.addCase(fetchArticles.rejected, (state, action) => {
   state.status = 'failed';
   state.error = true;
   state.error = action.error.message;
  });
 },
});

export const { add, getAll } = articlesSlice.actions;
export default articlesSlice.reducer;
