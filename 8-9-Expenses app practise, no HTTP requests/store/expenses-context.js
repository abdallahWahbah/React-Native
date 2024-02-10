import { createContext, useState } from "react";


const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2024-2-5")
    },
    {
        id: "e2",
        description: "A pair of trousers",
        amount: 89.29,
        date: new Date("2024-2-2")
    },
    {
        id: "e3",
        description: "Some bananas",
        amount: 5.99,
        date: new Date("2024-1-30")
    },
    {
        id: "e4",
        description: "A book",
        amount: 14.99,
        date: new Date("2024-1-29")
    },
    {
        id: "e5",
        description: "Another book",
        amount: 19,
        date: new Date("2024-1-20")
    },
    // {
    //     id: "e6",
    //     description: "A pair of shoes",
    //     amount: 59.99,
    //     date: new Date("2024-2-5")
    // },
    // {
    //     id: "e7",
    //     description: "A pair of trousers",
    //     amount: 89.29,
    //     date: new Date("2024-2-1")
    // },
    // {
    //     id: "e8",
    //     description: "Some bananas",
    //     amount: 5.99,
    //     date: new Date("2024-1-30")
    // },
    // {
    //     id: "e9",
    //     description: "A book",
    //     amount: 14.99,
    //     date: new Date("2024-1-29")
    // },
    // {
    //     id: "e10",
    //     description: "Another book",
    //     amount: 19,
    //     date: new Date("2024-1-20")
    // },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
})

function ExpensesContextProvider({children})
{
    const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

    const addExpense = ({description, amount, date}) =>
    {
        const id = new Date().toString() + Math.random().toString();
        setExpenses(current => [{id, description, amount, date}, ...current])
    }

    const updateExpense = (id, {description, amount, date}) =>
    {
        const updatableExpenseId = expenses.findIndex(expense => expense.id === id)
        expenses[updatableExpenseId] = {...expenses[updatableExpenseId], description, amount, date}
        setExpenses(current => [...current])
    }

    const deleteExpense = (id) =>
    {
        const newExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(newExpenses);
    }

    const value = {
        expenses,
        addExpense,
        updateExpense,
        deleteExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;