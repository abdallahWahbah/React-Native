import { StyleSheet, Text, Platform } from "react-native"
import Colors from "../../constants/colors"

function Title({ children })
{
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        // fontWeight: "bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        borderWidth: Platform.OS === "android" ?  2: 0,
        // borderWidth: Platform.select({ios: 0, android: 2}),
        borderColor: "white",
        padding: 12,
        maxWidth: "80%",
        width: 300, // take only 300px from the width if there is too much space
    }
})