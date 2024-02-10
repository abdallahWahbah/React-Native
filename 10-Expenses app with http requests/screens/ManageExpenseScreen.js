import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import { addExpenseHTTP, deleteExpenseHTTP, updateExpenseHTTP } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenseScreen({route, navigation})
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selsectedExpense = expensesContext.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(()=>
    {
        navigation.setOptions({title: isEditing ? "Edit Expense" : "Add Expense"})
    }, [isEditing])

    const deleteExpensehandler = async () =>
    {
        setIsSubmitting(true);
        try
        {
            await deleteExpenseHTTP(editedExpenseId);
            expensesContext.deleteExpense(editedExpenseId)
            navigation.goBack();
        }
        catch(error)
        {
            setError("Couldn't delete the expense, please try again later")
            setIsSubmitting(false);
        }
    }

    const cancelHandler = () => navigation.goBack();

    const confirmHandler = async (expenseData) =>
    {
        setIsSubmitting(true);
        try
        {
            if(isEditing) 
            {
                expensesContext.updateExpense(editedExpenseId, expenseData);
                updateExpenseHTTP(editedExpenseId, expenseData)
            }
            else 
            {
                const id = await addExpenseHTTP(expenseData);
                expensesContext.addExpense({...expenseData, id})
            }
            navigation.goBack();
        }
        catch(error)
        {
            setError("Couldn't save data, please try again later")
            setIsSubmitting(false); 
        }
    }

    if(error) return <ErrorOverlay message={error} onConfirm={() => setError(null)}/>

    if(isSubmitting) return <LoadingOverlay />

    return (
        <View style={styles.container}>
            <ExpenseForm 
                onCancel={cancelHandler}
                submitButtonLabel={isEditing ? "Update"  :"Add"}
                onSubmit={confirmHandler}
                defaultValues={selsectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        name="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpensehandler}
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"
    }
})