import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// Асинхронно действие за изпращане на коментар
export const submitComment = createAsyncThunk(
    // "submitComment",
    // async ({email, name, id, comment, time, date}, {rejectWithValue}) => {
    //     try {
    //         const response = await fetch('/api/addComments', {
    //             method: "POST",
    //             body: JSON.stringify({email, name, id, comment, time, date})
    //         });
    //         console.log("pesho", response.data);
    //         return response.data;
    //     } catch (error) {
    //         return rejectWithValue(error.response.data);
    //     }
    // }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        isLoading: false,
        addComments: [],
        status: "idle",
        error: false,
    },
    reducers: {
        addComments(state, action) {
            state.addComments.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitComment.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(submitComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isLoading = false;
                state.comments.push(action.payload);
            })
            .addCase(submitComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = true;
                state.error = action.error.message;
            });
    },
});

export const {addComments} = commentsSlice.actions;
export default commentsSlice.reducer;
