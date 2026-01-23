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
      const response = await axios.post(
        'http://localhost:5000/products',
        {
          ...product,
          vendus: 0, // 👈 added, nothing else changed
        }
      );

      return response.data; // created product with id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// 🔥 DELETE PRODUCT (DELETE)
export const deleteProduct = createAsyncThunk(
  'data/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      return productId; // return the id of the deleted product
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔥 EDIT PRODUCT (PUT)
export const editProduct = createAsyncThunk(
  'data/editProduct',
  async ({ id, updatedProduct }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/${id}`,
        updatedProduct
      );
      return response.data; // updated product
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔥 FETCH ONE PRODUCT BY ID (GET)
export const fetchProductById = createAsyncThunk(
  'data/fetchProductById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      return response.data; // single product
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// 🔥 AI DESCRIPTION THUNK
export const describeSalesByCategory = createAsyncThunk(
  'data/describeSalesByCategory',
  async (categoryMap, thunkAPI) => {
    try {
      const response = await axios.post('/api/ai/describe', {
        data: categoryMap,
      });
      return response.data.description;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'AI description failed'
      );
    }
  }
);




// ================= INITIAL STATE =================

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  aiDescription: '',
  aiLoading: false,
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
      })

      // ===== DELETE PRODUCT =====
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

            // ===== EDIT PRODUCT =====
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
  const index = state.products.findIndex(
    (product) => product.id === action.payload.id
  );

  if (index !== -1) {
    state.products[index] = action.payload;
  }

  // 🔥 THIS IS WHAT YOU MISSED
  if (state.selectedProduct?.id === action.payload.id) {
    state.selectedProduct = action.payload;
  }

  state.loading = false;
})

      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH ONE PRODUCT =====
.addCase(fetchProductById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchProductById.fulfilled, (state, action) => {
  state.selectedProduct = action.payload;
  state.loading = false;
})
.addCase(fetchProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


// ===== AI DESCRIPTION =====
.addCase(describeSalesByCategory.pending, (state) => {
  state.aiLoading = true;
  state.aiDescription = '';
})
.addCase(describeSalesByCategory.fulfilled, (state, action) => {
  state.aiLoading = false;
  state.aiDescription = action.payload;
})
.addCase(describeSalesByCategory.rejected, (state, action) => {
  state.aiLoading = false;
  state.aiDescription = 'Failed to generate AI insights.';
});




      
  },
});

export default dataSlice.reducer;
