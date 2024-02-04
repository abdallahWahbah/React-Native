import { Pressable, StyleSheet, Text, View } from "react-native";

function GoalItem(props)
{
    const handleDelete = (id) =>
    {
        props.setCourseGoals(currentCourseGoals => currentCourseGoals.filter(goal => goal.id !== id))
    }
    return(
        <View style={styles.goalItem}>
            <Pressable 
                onPress={() => handleDelete(props.itemData.item.id)}
                android_ripple={{color: "#210644"}}    // styling when we click for android 
                style={({pressed}) => pressed && styles.pressedItem}   // styling when we click for ios 
            >
                <Text style={styles.goalText}>{props.itemData.index} {props.itemData.item.text}</Text>
                {/* itemData.((item)).text >>> you need to call "item" to access your item */} 
                {/* We added View as a parent to Text cause Text because in ios phone doesn't support borderRadius */}
            </Pressable>
        </View>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    pressedItem: {
        opacity: .5
    },
    goalText: {
        color: "white",
        padding: 8,
    }
})