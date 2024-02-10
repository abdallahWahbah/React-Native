import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";

function ManageExpenseScreen({route, navigation})
{
    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selsectedExpense = expensesContext.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(()=>
    {
        navigation.setOptions({title: isEditing ? "Edit Expense" : "Add Expense"})
    }, [isEditing])

    const deleteExpensehandler = () =>
    {
        expensesContext.deleteExpense(editedExpenseId)
        navigation.goBack();
    }

    const cancelHandler = () => navigation.goBack();

    const confirmHandler = (expenseData) =>
    {
        if(isEditing) 
        {
            expensesContext.updateExpense(editedExpenseId, expenseData);
        }
        else 
        {
            expensesContext.addExpense(expenseData)
        }
        navigation.goBack();
    }

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