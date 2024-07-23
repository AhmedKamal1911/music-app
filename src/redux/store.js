import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "@/redux/features/playerSlice";
import { musicApi } from "./services/musicApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware),
});
setupListeners(store.dispatch);
