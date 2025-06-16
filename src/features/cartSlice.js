import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

// פונקציה בטוחה לשליפת נתונים מה-localStorage
const getLocalStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const initialState = {
  arrRooms: getLocalStorageItem("cart", []),
  SumRooms: getLocalStorageItem("sumRooms", 0),
  countRooms: getLocalStorageItem('countRooms', 0)
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // הוספת חדר לסל
    addToCart: (state, action) => {
      let index = state.arrRooms.findIndex(item => item._id === action.payload._id);
      if (index > -1) {
        state.arrRooms[index].qty++;
        state.SumRooms += state.arrRooms[index].price;
        state.countRooms++;
      } else {
        state.arrRooms.push({ ...action.payload, qty: 1 });
        state.SumRooms += action.payload.price;
        state.countRooms++;
      }

      localStorage.setItem("cart", JSON.stringify(state.arrRooms));
      localStorage.setItem("sumRooms", JSON.stringify(state.SumRooms));
      localStorage.setItem("countRooms", JSON.stringify(state.countRooms));
    },

    // הפחתת חדר מהסל
    deleteFromCart: (state, action) => {
      let index = state.arrRooms.findIndex(item => item._id === action.payload._id);
      if (index > -1) {
        if (state.arrRooms[index].qty > 1) {
          state.arrRooms[index].qty--;
          state.countRooms--;
          state.SumRooms -= state.arrRooms[index].price;
        } else {
          state.SumRooms -= state.arrRooms[index].price;
          state.countRooms -= state.arrRooms[index].qty;
          state.arrRooms.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(state.arrRooms));
        localStorage.setItem("sumRooms", JSON.stringify(state.SumRooms));
        localStorage.setItem("countRooms", JSON.stringify(state.countRooms));
      }
    },

    // מחיקת חדר מהסל
    deleteRoomFromCart: (state, action) => {
      let index = state.arrRooms.findIndex(item => item._id === action.payload._id);
      if (index > -1) {
        state.SumRooms -= (state.arrRooms[index].price * state.arrRooms[index].qty);
        state.countRooms -= state.arrRooms[index].qty;
        state.arrRooms.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.arrRooms));
        localStorage.setItem("sumRooms", JSON.stringify(state.SumRooms));
        localStorage.setItem("countRooms", JSON.stringify(state.countRooms));
      }
    }
    ,

    // מחיקת כל הסל
    EmptyingTheBasket: (state) => {
      state.arrRooms = [];
      state.SumRooms = 0;
      state.countRooms = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("sumRooms");
    }
  },
});

export const { addToCart, deleteFromCart, deleteRoomFromCart, EmptyingTheBasket } = cartSlice.actions;
export default cartSlice.reducer;
