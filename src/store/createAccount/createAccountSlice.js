import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//!production
const url = `${process.env.NEXT_PUBLIC_APP_API_URL_PROD}`;

//!development
// const url = `${process.env.NEXT_PUBLIC_APP_API_URL_DEV}`;
// Async thunk for creating an account
export const createAccount = createAsyncThunk('account/createAccount', async (userData, thunkAPI) => {
    try {
        const response = await fetch(`${'https://share.d-dimitrov.eu'}/api/create-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data); // ще влезе в .rejected и catch
        }

        localStorage.setItem('token', data.token);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ message: 'Неуспешна регистрация', error: err });
    }
});

const createAccountSlice = createSlice({
    name: 'account',
    initialState: {
        username: '',
        first_name: '',
        lastName: '',
        email: '',
        password: '',
        status: 'idle',
        errorCreate: null,
    },
    reducers: {
        setFirstName: (state, action) => {
            state.first_name = action.payload;
        },
        setUserName: (state, action) => {
            state.username = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userName = '';
                state.firstName = '';
                state.lastName = '';
                state.email = '';
                state.password = '';
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.errorCreate = action.payload;
            });
    },
});

export const { setUserName, setFirstName, setLastName, setEmail, setPassword } = createAccountSlice.actions;

export default createAccountSlice.reducer;
