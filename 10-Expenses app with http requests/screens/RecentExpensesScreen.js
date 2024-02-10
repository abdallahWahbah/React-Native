import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateBeforeNumberOfDays } from "../util/date";
import { getExpensesHTTP } from "../util/http";
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpensesScreen()
{
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesContext = useContext(ExpensesContext);

    useEffect(()=>
    {
        const getExpense = async () =>
        {
            setIsFetching(true);
            try
            {
                const expenses = await getExpensesHTTP();
                expensesContext.setExpenses(expenses);
            }
            catch (error)
            {
                console.log("sssssssssssssssssssssssssssss")
                setError("Couldn't fetch expenses")
            }
            setIsFetching(false);
        }
        getExpense();
    }, [])

    const recentExpenses = expensesContext.expenses.filter(expense => {
            const today = new Date();
        const dateBefore7Days = getDateBeforeNumberOfDays(today, 7);
        return expense.date > dateBefore7Days
    })

    if(error) return <ErrorOverlay message={error} onConfirm={() => setError()}/>

    if(isFetching) return <LoadingOverlay />

    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days" 
            fallbackText="No expenses registered for the last 7 days!"
        />
    )
}

export default RecentExpensesScreen;