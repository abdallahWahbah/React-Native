import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues})
{
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues?.amount.toString() ||  "",
            isValid: true 
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) :  "", // you can call getFormattedDate from date file
            isValid: true 
        },
        description: {
            value: defaultValues?.description.toString() || "",
            isValid: true 
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue)
    {
        setInputs((currentInputs) => {
            return {
                ...currentInputs, 
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    const submitHandler = () =>
    {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid)
        {
            // Alert.alert("Invalid Input", "Please check your input values")
            setInputs(currentInputs => {
                return {
                    amount: {value: currentInputs.amount.value, isValid: amountIsValid},
                    date: {value: currentInputs.date.value, isValid: dateIsValid},
                    description: {value: currentInputs.description.value, isValid: descriptionIsValid},
                }
            })

            return;
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input 
                    style={styles.rowInput}
                    label="Amount" 
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        value: inputs.amount.value,
                        onChangeText: (enteredText) => {inputChangeHandler("amount", enteredText)}
                    }}
                />
                <Input
                    style={styles.rowInput} 
                    label="Date" 
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        value: inputs.date.value,
                        onChangeText: inputChangeHandler.bind(this, "date")
                    }}
                />
            </View>
            <Input 
                label="Description" 
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false, // default is true
                    // autoCapitalize: "none" // "characters": all chars, "words": first char of each word, "sentences": first char of each sentence (default), "none"
                    value: inputs.description.value,
                    onChangeText: (enteredText) => {inputChangeHandler("description", enteredText)}
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input value - Please check your input data
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },  
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
})