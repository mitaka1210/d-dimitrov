import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getArticleComment = createAsyncThunk("getArticleComment", async (id) => {
    return fetch(`api/getComments?${id}`)
        .then(response => response.json())
        .then(json => {
            return json;
        });
});

const initialState = {
    data: [],
    error: false,
    status: "idle"
};

const articleCommentsSlice = createSlice({
    name: "getComment",
    initialState,
    reducers: {
        resetState: (state) => {
            return initialState; // Нулиране на състоянието
        },
    },
    extraReducers: builder => {
        builder.addCase(getArticleComment.pending, (state, action) => {
            state.status = "loading";
            state.isLoading = true;
        });
        builder.addCase(getArticleComment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(getArticleComment.rejected, (state, action) => {
            state.status = "failed";
            state.error = true;
            state.error = action.error.message;
        });
    }
});

export const {resetState} = articleCommentsSlice.actions;

export default articleCommentsSlice.reducer;
