import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) =>
{
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if(randomNumber === exclude) return generateRandomBetween(min, max, exclude);
    else return randomNumber;
}

let minBoundary = 1, maxBoundary = 100;

function GameScreen({ userNumber, onGameOver })
{
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(()=> // for starting a new game
    {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    useEffect(() =>
    {
        if(currentGuess === userNumber)
        {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    const nextGuessHandler = (direction) => // "lower", "higher"
    {
        if(
            (direction === "lower" && currentGuess < userNumber)
            || 
            (direction === "higher" && currentGuess > userNumber)
        )
        {
            Alert.alert("Don't lie", "You know that this is wrong",[{text: "sorry", style: "cancel"}]);
            return;
        }

        if(direction === "lower") maxBoundary = currentGuess;
        else minBoundary = currentGuess + 1;

        // most likely, you can use divide and conquer algorithm
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRandomNumber);

        setGuessRounds(guesses => [newRandomNumber, ...guesses]);
    }


    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Ionicons name="remove" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                            <Ionicons name="add" size={24} color="white"/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(round => (<Text key={round}>{round}</Text>))} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRounds.length - itemData.index} guess={itemData.item}/>}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1, // to take the whole height
        padding: 24
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})
