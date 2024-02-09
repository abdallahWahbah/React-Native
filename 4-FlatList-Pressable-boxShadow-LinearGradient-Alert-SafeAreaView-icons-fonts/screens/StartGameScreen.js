import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickNumber})
{
    const [enteredNumber, setEnteredNumber] = useState("");

    const resetInputHandler = () => setEnteredNumber("");

    const confirmInputHandler = () =>
    {
        const chosenNumber = parseInt(enteredNumber); // or using +enteredNumber
        
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99)
        {
            Alert.alert(
                'Invalid Number', // title
                'Number has to be a number between 1 and 99', // message
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }] // array of buttons
            );
            return;
        }
        onPickNumber(chosenNumber)

    }
    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number</Title>
            <Card>
                {/* <Text style={styles.instructionText} ></Text> */}
                <InstructionText>Enter a Number</InstructionText>
                <TextInput 
                    style={styles.numberInput} 
                    maxLength={2}
                    keyboardType="number-pad"                   
                    autoCapitalize="none"  // not important here, just for your knowledge
                    autoCorrect={false} // not important here, just for your knowledge
                    value={enteredNumber}
                    onChangeText={(enteredValue) => setEnteredNumber(enteredValue)}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}> 
                    {/** we added view (button container) to make button stretch (to add flex: 1 to them so that they can take all the available space >>> cause flex is applied to them by default) */}
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: "center"
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    }
})
