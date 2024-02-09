import { configureStore } from "@reduxjs/toolkit";

import favoriteReducer from './favorites'

// we used redux in App.js to wrap the whole applicaiton, store/redux/favorites, MealDetailsScreen, FavoritesScreen
export const store = configureStore({
    reducer: {
        favoriteMeals: favoriteReducer
    }
})