import axios from "axios";

const URL = "https://react-native-course-1b62e-default-rtdb.firebaseio.com"

export const addExpenseHTTP = async expenseData =>
{
    const response = await axios.post(URL+"/expenses.json", expenseData);
    const id = response.data.name;
    return id;
}

export const getExpensesHTTP = async () =>
{
    const response = await axios.get(URL+"/expenses.json");
    // console.log(response.data)
    const expenses = [];
    for(let key in response.data)
    {
        const expensesObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expensesObject)
    }
    return expenses
}

export const updateExpenseHTTP = async (id, expenseData) =>
{
    return axios.put(`${URL}/expenses/${id}.json`, expenseData)
}

export const deleteExpenseHTTP = async (id) =>
{
    return axios.delete(`${URL}/expenses/${id}.json`)
}