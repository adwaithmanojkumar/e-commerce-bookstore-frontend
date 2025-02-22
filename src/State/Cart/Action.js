import { api } from "../../Config/apiConfig"
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"

export const getCartItems = (jwt) => async (dispatch) => {
    dispatch({type:GET_CART_REQUEST})

    try {
        const {data} = await api.get(`/cart`)
        dispatch({type:GET_CART_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_CART_FAILURE,payload:error.message})
    }
}

export const addItemsToCart = (reqData) => async (dispatch) => {
    dispatch({type:ADD_ITEM_TO_CART_REQUEST})

    try {
        console.log('Request data:', reqData);
        // const {data} = await api.post("/cart/add",reqData.bookId)
        const token = localStorage.getItem("jwt"); // Modify this based on how you store the JWT

        const { data } = await api.post("/cart/add", reqData, {
            headers: {
                "Authorization": `Bearer ${token}` // Include JWT in Authorization header
            }
        });
        console.log('Request data:', reqData);
        console.log('Response data:', data);
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS,payload:data})
        console.log('add items to cart',reqData)
    } catch (error) {
        dispatch({type:ADD_ITEM_TO_CART_FAILURE,payload:error.message})
    }
}

export const removeCartItem = (reqData) => async (dispatch) => {
    dispatch({type:REMOVE_CART_ITEM_REQUEST})

    try {
        const {data} = await api.delete(`/cartItem/${reqData.cartItemId}`)
        dispatch({type:REMOVE_CART_ITEM_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:REMOVE_CART_ITEM_FAILURE,payload:error.message})
    }
}

export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({type:UPDATE_CART_ITEM_REQUEST})

    try {
        const {data} = await api.put(`/cartItem/${reqData.cartItemId}`,reqData.data)
        dispatch({type:UPDATE_CART_ITEM_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_CART_ITEM_FAILURE,payload:error.message})
    }
}