import {createSlice, current} from "@reduxjs/toolkit"
import { startTransition } from "react"

const initialState={
    currentUser: JSON.parse(localStorage.getItem("currentUserLS"))||null,
}

const userSlice=createSlice({
   name:"user" ,
   initialState,

   reducers:{
    userIn :(state,action)=>{
        state.currentUser=action.payload;
        localStorage.setItem("currentUserLS", JSON.stringify(state.currentUser));

    },
    userOut:(state) =>{
        localStorage.removeItem("currentUserLS");
        state.currentUser=null;
    },
    setCurrentUser: (state, action) => {
        state.currentUser = action.payload;
        localStorage.setItem("currentUserLS", JSON.stringify(state.currentUser));

    }

   }
})

export const {userIn,userOut,setCurrentUser} =userSlice.actions;
export default userSlice.reducer;
