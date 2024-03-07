import { createSlice } from "@reduxjs/toolkit";

export const counterList = createSlice({
    name: "musiclist",
    initialState: {
        value: [],
        currentvalue: 0
    },
    reducers: {
        addSongsforMusicPlayer: (state, action) => {
            state.value = action.payload;
        },
        PlayCurrentSong: (state, action) => {
            state.currentvalue = action.payload;
        }
    }
});

export const { addSongsforMusicPlayer, PlayCurrentSong } = counterList.actions;

export default counterList.reducer;