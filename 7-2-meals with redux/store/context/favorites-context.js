import {createContext, useState} from "react";
import { Text } from "react-native";

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {}
})


// we used this conext in the App.js to wrap the whole application,  MealDetailsScreen, FavoritesScreen
function FavoritesContextProvider({children})
{
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    const addFavorite = id =>
    {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id])
    } 

    const removeFavorite = id =>
    {
        setFavoriteMealIds(currentFavIds => currentFavIds.filter(mealId => mealId !== id))
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite,
        removeFavorite,
    }

    return (<FavoritesContext.Provider value={value}>
        {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContextProvider;