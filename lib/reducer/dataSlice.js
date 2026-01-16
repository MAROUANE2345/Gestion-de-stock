import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ================= ASYNC THUNKS =================

// 🔥 FETCH PRODUCTS (GET)
export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔥 ADD PRODUCT (POST)
export const addProduct = createAsyncThunk(
  'data/addProduct',
  async (product, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/products', product);
      return response.data; // created product with id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ================= INITIAL STATE =================

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// ================= SLICE =================

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== FETCH PRODUCTS =====
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== ADD PRODUCT =====
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
