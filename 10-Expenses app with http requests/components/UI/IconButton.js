import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({name, color, size, onPress})
{
    return(
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => pressed && styles.pressed} // animation when press on ios
        >
            <View style={styles.buttonContainer} >
                <Ionicons name={name} color={color} size={size}/>
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles =StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: .75
    }
})