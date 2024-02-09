import { useNavigation } from "@react-navigation/native";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MealLittleDetails from "../MealLittleDetails";

function MealItem({id, title, imageUrl, duration, complexity, affordability})
{
    const navigation = useNavigation(); // we used the hook cause the component is not a screen component
    const goToMealDetails = () =>
    {
        navigation.navigate("MealDetail", {
            mealId: id
        })
    }
    return(
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => pressed ? styles.buttonPressedIOS : null}
                onPress={goToMealDetails}
            >
                <View style={styles.innerContainer}>
                    <View>
                        {/* // if the image source is a link >>>> you need to style height and width for it(mandatory) */}
                        <Image 
                            style={styles.image}
                            source={{uri: imageUrl}}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealLittleDetails 
                        duration={duration}
                        complexity={complexity}
                        affordability={affordability}
                    />
                </View>
            </Pressable>
        </View>
    )
}

export default MealItem;


const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible", 
        // when you press on Pressable, it gives #ccc color >>> but it overflows the grid round corners (borderRadius), so we hide it
        // we used Platform.OS cause it prevented the shadow to appear on ios 
        backgroundColor: "white",
        // shadow
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: .35,
        shadowRadius: 16,
    },  
    buttonPressedIOS: {
        opacity: .5
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8
    },
    
})