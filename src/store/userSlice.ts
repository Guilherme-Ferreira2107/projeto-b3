import { toast } from "react-toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserState } from "@/interfaces";

const initialState: IUserState = {
  name: "",
  lastName: "",
  country: "",
  email: "",
  isAuthenticated: false,
  darkMode: false,
  allowNotifications: false,
  language: "PT",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Omit<IUserState, "isAuthenticated">>
    ) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.country = action.payload.country;
      state.email = action.payload.email;
    },

    updateUser: (state, action: PayloadAction<Partial<IUserState>>) => {
      Object.assign(state, action.payload);
    },

    loginUser: (state, action: PayloadAction<{ email: string }>) => {
      if (action.payload.email === state.email) {
        state.isAuthenticated = true;
      } else {
        toast.error("E-mail não encontrado! Cadastre-se primeiro!");
      }
    },

    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
