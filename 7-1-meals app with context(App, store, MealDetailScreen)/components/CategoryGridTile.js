import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

// import { useNavigation } from "@react-navigation/native";

function CategoryGridTile({title, color, onPress})
{
    // const navigation = useNavigation()
    return(
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable 
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [styles.button, pressed ? styles.buttonPressedIOS : null]}
                onPress={onPress}
            >
                <View  style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1, // to take all the available space (the width now is divided by two)
        margin: 16,
        height: 150,
        borderRadius: 8,
        // shadow
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: .25,
        shadowRadius: 8,
        backgroundColor: "white", // if the shadow for ios didn't work, use backgroundColor with them (shadow preperties)
        overflow: Platform.OS === "android" ? "hidden" : "visible", 
        // when you press on Pressable, it gives #ccc color >>> but it overflows the grid round corners (borderRadius), so we hide it
        // we used Platform.OS cause it prevented the shadow to appear on ios
    },
    button: {
        flex: 1,
    },
    buttonPressedIOS: {
        opacity: .5
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    }
})