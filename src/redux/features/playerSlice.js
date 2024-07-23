import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  generListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.currentIndex = action.payload.i;
      state.currentSongs = action.payload.data;
      state.isPlaying = true;
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    nextSong: (state, action) => {
      // LOOK
      const songIdx = (state.currentIndex + 1) % state.currentSongs.length;
      state.activeSong = state.currentSongs[songIdx];
      state.currentIndex = songIdx;
      state.isPlaying = true;
    },
    prevSong: (state, action) => {
      // LOOK
      let songIdx = state.currentIndex - 1;
      if (songIdx < 0) {
        songIdx = state.currentSongs.length - 1;
      }
      state.currentIndex = songIdx;
      state.activeSong = state.currentSongs[state.currentIndex];
      state.isPlaying = true;
    },
    shuffleSong: (state, action) => {
      const randomNumber = Math.floor(
        Math.random() * state.currentSongs.length
      );
      state.activeSong = state.currentSongs[randomNumber];
      state.currentIndex = randomNumber;
    },
  },
});

export const { setActiveSong, playPause, nextSong, prevSong, shuffleSong } =
  playerSlice.actions;
export default playerSlice.reducer;
