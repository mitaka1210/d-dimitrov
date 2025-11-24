import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// getAll likesDislikes from server
export const fetchLikesDislikes = createAsyncThunk("fetchLikesDislikes", async (id) => {
    return fetch(`api/getArticle?${id}`)
        .then((res) => res.json())
        .then((json) => {
            return json;
            // setData(data);
        });
});


const initialState = {
    isLoading: false,
    data: {},
    error: false,
    status: "idle"
};

const likesSlice = createSlice({
    name: "likesDislikes",
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
        incrementLike: (state) => {
            state.data.likes += 1;
        },
        incrementDislike: (state) => {
            state.data.dislikes += 1;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchLikesDislikes.pending, (state, action) => {
            state.status = "loading";
            state.isLoading = true;
        });
        builder.addCase(fetchLikesDislikes.fulfilled, (state, action) => {
            let likesDislikesArr = {};
            state.isLoading = false;
            state.status = "succeeded";
            likesDislikesArr = {...action.payload[0]};
            state.data = likesDislikesArr;
        });
        builder.addCase(fetchLikesDislikes.rejected, (state, action) => {
            state.status = "failed";
            state.error = true;
            state.error = action.error.message;
        });
    }
});

export const {incrementLike, resetState, incrementDislike} = likesSlice.actions;

export default likesSlice.reducer;
