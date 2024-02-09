import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealLittleDetails from "../components/MealLittleDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

function MealDetailScreen({route, navigation})
{
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    const headerButtonPressHandler = () =>
    {
        console.log("first")
    }
    
    useLayoutEffect(()=> // the same as useEffect >>> but it executes the code inside of it before (not after) the component has been rendered
    {
        navigation.setOptions({
            headerRight: () => {
                return (<IconButton iconName="star" color="white" onPress={headerButtonPressHandler}/>)
            }
        })
    }, [])
    return(
        <ScrollView style={styles.rootContainer}>
            <Image 
                style={styles.image}
                source={{uri: selectedMeal.imageUrl}}
            /> 
            {/** if the image source is a link >>>> you need to style height and width for it(mandatory) */}
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealLittleDetails 
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients}/>

                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps}/>
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: "100%",
        height: 350
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white"
    },
    detailText: {
        color: "white"
    },
    listOuterContainer: {
        // flex: 1,
        // textAlign: "center"
        alignItems: "center"
    },
    listContainer: {
        width: "80%"
    }
})