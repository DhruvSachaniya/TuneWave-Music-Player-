import { createSlice } from "@reduxjs/toolkit";

export const counterSearch = createSlice({
    name: "searchinput",
    initialState: {
        input: ""
    },
    reducers: {
        changeinputvalue: (state, action) => {
            state.input = action.payload;
        }
    }
});

export const { changeinputvalue } = counterSearch.actions;

export default counterSearch.reducer;