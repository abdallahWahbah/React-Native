import { useState } from "react";
import { Button, TextInput, View, StyleSheet, Modal, Image } from "react-native";

function GoalInput(props)
{
    const [enteredGoalText, setEnteredGoalText] = useState("");

    const goalInputHandler = (enteredText) =>
    {
        setEnteredGoalText(enteredText)
    }

    const addGoalHandler = () =>
    {
        // props.setCourseGoals([...courseGoals, enteredGoalText]) // if the new state depends on the old state, use the next line
        // props.setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText]);
        props.setCourseGoals(currentCourseGoals => [...currentCourseGoals, {text: enteredGoalText, id: Math.random().toString()}]) 
        // we added key to use it in the FlatList automatically (we don't write it in the return render function)
        // or you can use keyExtractor if you added id instead of key (manually)
        setEnteredGoalText("");
        props.setModalIsVisible(false);
    }

    return(
        <Modal visible={props.visible} animationType={"slide"}>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require("../assets/images/goal.png")}/>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Your course goal!"
                    value={enteredGoalText}
                    onChangeText={goalInputHandler}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="cancel" 
                            onPress={() => props.setModalIsVisible(false)}
                            color="#f31282"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="add goal!"
                            onPress={addGoalHandler}
                            color="#5e0acc"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#311b6b"
    },
    image: {
        width: 100,
        height: 100,
        margin: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#e4d0ff",
        backgroundColor: "#e4d0ff",
        color: "#120438",
        borderRadius: 6,
        width: "100%",
        padding: 16
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: "row"
    },
    button: {
        width: 100,
        marginHorizontal: 8
    }
})