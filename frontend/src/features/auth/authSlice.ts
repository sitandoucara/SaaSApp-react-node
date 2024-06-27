import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    initializeUser: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { setUser, clearUser, initializeUser } = authSlice.actions;

export default authSlice.reducer;
