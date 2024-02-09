import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({children})
{
    return(
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer;

const screenWidth = Dimensions.get("window").width; 
// screen vs window
// 	- ios: no difference
// 	- android: screen is the entire available width, height including the status bar >>> window is exluding the status bar

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        borderRadius: 8,
        padding: screenWidth < 380 ? 12 : 24,
        margin: screenWidth < 380 ? 12 : 24,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontSize: screenWidth < 380 ? 288 : 24,
        // fontWeight: "bold"
        fontFamily: "open-sans-bold"
    }
})