import { createSlice } from "@reduxjs/toolkit";
import MusicPlayer from "../../components/Music-player/MusicPlayer";

export const counterList = createSlice({
    name: "musiclist",
    initialState: {
        value: []
    },
    reducers: {
        addSongsforMusicPlayer: (state, action) => {
            state.value = action.payload;
            console.log(state.value);
        }
    }
});

export const { addSongsforMusicPlayer } = counterList.actions;

export default counterList.reducer;