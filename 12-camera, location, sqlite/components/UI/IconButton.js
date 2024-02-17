import { Pressable, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({iconName, color, size, onPress})
{
    return (
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}> 
            <Ionicons name={iconName} color={color} size={size}/>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8, 
        justifyContent: "center",
        alignItems: "center"
    },
    pressed: {
        opacity: .7
    }
})