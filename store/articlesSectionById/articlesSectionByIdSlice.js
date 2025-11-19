import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// getAll likesDislikes from server
export const fetchSections = createAsyncThunk('getSections', async (id) => {
 const response = await fetch(`/api/getArticleSectionById?id=${id}`);
 if ( !response.ok) {
  console.error('API Error:', response.statusText);
  throw new Error('Failed to fetch articles');
 }
 return await response.json();
});
const fetchImage = (file, path) => {
 if (file !== null && path !== null) {
  const blob = new Blob([new Uint8Array(file.data)], { type: `image/${path.split('.').pop()}` });
  return URL.createObjectURL(blob);
 }
};

const initialState = {
 likes: 0,
 dislikes: 0,
 data: [],
 error: false,
 status: 'idle',
};
const sectionByIdSlice = createSlice({
 name: 'sectionById',
 initialState,
 reducers: {
  resetState: (state) => {
   return initialState; // Нулиране на състоянието
  },
 },
 extraReducers: builder => {
  builder.addCase(fetchSections.pending, (state, action) => {
   state.status = 'loading';
   state.isLoading = true;
  });
  builder.addCase(fetchSections.fulfilled, (state, action) => {
   let articlesData = [];
   state.isLoading = false;
   state.status = 'succeeded';
   for (let i = 0; i < action.payload.length; i++) {
    articlesData.push({
     position: action.payload[i].position,
     title: action.payload[i].title,
     content: action.payload[i].content,
     date: action.payload[i].created_at,
     images: action.payload[i].image_url,
    });
   }

   state.data = articlesData;
  });
  builder.addCase(fetchSections.rejected, (state, action) => {
   state.status = 'failed';
   state.error = true;
   state.error = action.error.message;
  });
 },
});

export const { resetState } = sectionByIdSlice.actions;

export default sectionByIdSlice.reducer;
