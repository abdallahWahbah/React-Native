import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({children})
{
    return(
        <View style={styles.card}>{children}</View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // shadow for android
        elevation: 4,
        // shadow for ios
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2}, // no shadow on left and right, shadow in positive y axis (down) by 2px
        shadowRadius: 6, // how much should the shadow spread 
        shadowOpacity: .25 // how transparent the shadow is
    },
})