import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
import { json } from "react-router-dom";
export const registerUser = createAsyncThunk("auth/register",async (userData,thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const loginUser = createAsyncThunk("auth/login",
   async (userData,thunkAPI)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
     async(thunkAPI) => {
        try {
            return await authService.getUserWishlist()
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
     async(cartData,thunkAPI) => {
        try {
            return await authService.addToCart(cartData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
     async(orderDetail,thunkAPI) => {
        try {
            return await authService.createOrder(orderDetail)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const getUserCart = createAsyncThunk(
    "user/cart/get",
     async(data,thunkAPI) => {
        try {
            return await authService.getCart(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const deleteUserCart = createAsyncThunk(
    "user/cart/delete",
     async(data,thunkAPI) => {
        try {
            return await authService.emptyCart(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const getOrders = createAsyncThunk(
    "user/order/get",
     async(thunkAPI) => {
        try {
            return await authService.getUserOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
     async(data,thunkAPI) => {
        try {
            return await authService.removeProductFromCart(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
     async(cartDetail,thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetail)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const updateProfile = createAsyncThunk(
    "user/profile/update",
     async(data,thunkAPI) => {
        try {
            return await authService.updateUser(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );
export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
     async(data,thunkAPI) => {
        try {
            return await authService.forgotPassToken(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );

export const resetPassword = createAsyncThunk(
    "user/reset-password/token",
     async(data,thunkAPI) => {
        try {
            return await authService.resetPass(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
     }
    );
export const resetState = createAction("Reset_all");
const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
    user: getCustomerfromLocalStorage,
    wishlist: "",
    cartProduct: "",
    cartProducts: "",
    orderedProduct: "",
    getorderedProduct: "",
    updateCart: "",
    token:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser=action.payload;
            if(state.isSuccess===true){
                toast.info("User Created Successfully");
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.payload.response.data.message);
            }
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if(state.isSuccess===true){
              localStorage.setItem("token",action.payload.token);
              toast.info("User logged in Successfully");
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error(action.payload.response.data.message);
            }
        }).addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getUserProductWishlist.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(addProdToCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(addProdToCart.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Added to Cart")
            }
        }).addCase(addProdToCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getUserCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getUserCart.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;
           
        }).addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteCartProduct.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCartProduct = action.payload;
           if(state.isSuccess){
            toast.success("product deleted from cart successfully")
           }
        }).addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something wend wrong")
               }
        }).addCase(updateCartProduct.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateCartProduct.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateCart = action.payload;
           if(state.isSuccess){
            toast.success("Product Updated From Cart Successfully")
           }
        }).addCase(updateCartProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something Went Wrong")
               }
        }).addCase(createAnOrder.pending,(state)=>{
            state.isLoading = true;
        }).addCase(createAnOrder.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orderedProduct = action.payload;
           if(state.isSuccess){
            toast.success("Ordered Created Successfully")
           }
        }).addCase(createAnOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something all Wrong")
               }
        }).addCase(getOrders.pending,(state)=>{
            state.isLoading = true;
        }).addCase(getOrders.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.getorderedProduct = action.payload;
          
        }).addCase(getOrders.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         
        }).addCase(updateProfile.pending,(state)=>{
            state.isLoading = true;
        }).addCase(updateProfile.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedUser = action.payload;
          
                let currentUserData = JSON.parse(localStorage.getItem("customer"))
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    email: action?.payload?.email,
                    mobile: action?.payload?.mobile,
                }
                localStorage.setItem("customer",JSON.stringify(newUserData))
                toast.success("Profile update successfuly")
          
        }).addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.success("Something Went Wrong")
            }
        }).addCase(forgotPasswordToken.pending,(state)=>{
            state.isLoading = true;
        }).addCase(forgotPasswordToken.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.token = action.payload;
            if(state.isSuccess){
                toast.success("Forgot Password Email Sent Successfully")
            }
        }).addCase(forgotPasswordToken.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something Went Wrong")
            }
        }).addCase(resetPassword.pending,(state)=>{
            state.isLoading = true;
        }).addCase(resetPassword.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.pass = action.payload;
            if(state.isSuccess){
                toast.success("Password Updated Successfully")
            }
        }).addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError){
                toast.error("Something Went Wrong")
            }
        }).addCase(deleteUserCart.pending,(state)=>{
            state.isLoading = true;
        }).addCase(deleteUserCart.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCart = action.payload;
         
        }).addCase(deleteUserCart.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    },
});


export default authSlice.reducer;