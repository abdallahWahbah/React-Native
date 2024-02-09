import { StyleSheet, FlatList, View } from "react-native";
import { useLayoutEffect } from "react";
// import { useRoute } from "@react-navigation/native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({route, navigation}) // the Navigator Screen receive route, navigation props to get the data
{
    // const route = useRoute();

    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter(mealItem =>
    {
        return mealItem.categoryIds.indexOf(catId) >= 0
    })

    // changing navigation header title dynamically
    useLayoutEffect(()=> // the same as useEffect >>> but it executes the code inside of it before (not after) the component has been rendered
    {
        const categoryTitle = CATEGORIES.find(cat => cat.id === catId).title;
    
        navigation.setOptions({
            title: categoryTitle
        })
    }, [catId])

    const renderMealItem = (itemData) =>
    {
        const mealItemProps = {
            id: itemData.item.id,
            title: itemData.item.title,
            imageUrl: itemData.item.imageUrl,
            duration: itemData.item.duration,
            complexity: itemData.item.complexity,
            affordability: itemData.item.affordability,
        }
        return (
            <MealItem {...mealItemProps}/>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={displayedMeals}
                keyExtractor={item => item.id}
                renderItem={renderMealItem}
            />
        </View>
    )
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})