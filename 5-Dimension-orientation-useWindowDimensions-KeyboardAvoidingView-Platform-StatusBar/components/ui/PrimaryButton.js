import { Text, View, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress})
{
    const pressHandler = () =>
    {
        onPress();
    }

    return(
        <View style={styles.buttonOuterContainer}>
            <Pressable 
                // style={styles.buttonInnerContainer}
                onPress={pressHandler}
                android_ripple={{color: Colors.primary600}} // styling when we click for android
                style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer}  
                 
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2, // boxShadow
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    iosPressed: {
        opacity: .75
    }
})