import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateBeforeNumberOfDays } from "../util/date";

function RecentExpensesScreen()
{
    const expensesContext = useContext(ExpensesContext);

    const recentExpenses = expensesContext.expenses.filter(expense => {
        const today = new Date();
        const dateBefore7Days = getDateBeforeNumberOfDays(today, 7);
        return expense.date > dateBefore7Days
    })
    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days" 
            fallbackText="No expenses registered for the last 7 days!"
        />
    )
}

export default RecentExpensesScreen;