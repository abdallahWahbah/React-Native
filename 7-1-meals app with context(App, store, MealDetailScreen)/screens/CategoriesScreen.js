import { FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoriesScreen({navigation}) // navigation is a special prop for Navigation Screens
{

    const pressHandler = (itemData) =>
    {
        navigation.navigate("MealsOverview", {categoryId: itemData.item.id}) // the second parameter is the data to pass to the MealsOveriew (optional)
    }

    return(
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => (
                <CategoryGridTile 
                    title={itemData.item.title} 
                    color={itemData.item.color} 
                    onPress={() => pressHandler(itemData)}
                />
            )}
            numColumns={2}
        />
    )
}

export default CategoriesScreen;
