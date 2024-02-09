import { Pressable, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({iconName, color, onPress})
{
    return (
        <Pressable style={({pressed})=> pressed ? styles.pressed : null} onPress={onPress}>
            <Ionicons 
                name={iconName} 
                size={24}
                color={color}
            />
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: .75
    }
})