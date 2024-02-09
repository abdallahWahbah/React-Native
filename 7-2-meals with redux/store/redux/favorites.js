import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: "favorites",
    initialState:{
        ids: []
    },
    reducers: {
        addFavorite: (lastState, action) =>
        {
            lastState.ids.push(action.payload.id)
        },
        removeFavorite: (lastState, action) =>
        {
            lastState.ids.splice(lastState.ids.indexOf(action.payload.id), 1)
        }
    }
})

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export default favoritesSlice.reducer;