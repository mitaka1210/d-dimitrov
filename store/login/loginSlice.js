import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


//!production
const url = `${process.env.NEXT_PUBLIC_APP_API_URL_PROD}`;
//!development
// const url = `${process..env.NEXT_PUBLIC_APP_API_URL_DEV}`;
// Async Thunks за логин
export const login = createAsyncThunk('auth/login', async ({ username, password, role }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${'https://share.d-dimitrov.eu'}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        localStorage.setItem('token', data.token); // Съхранява токена
        localStorage.setItem('role', data.role); // Съхранява ролята
        localStorage.setItem('name', data.username); // Съхранява името

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${'https://share.d-dimitrov.eu'}/api/check-auth`, {
            headers: { Authorization: token },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Authorization failed');
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); // Премахва токена
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
