// export const getFormattedDate = date =>  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
export const getFormattedDate = date =>  date.toISOString().slice(0, 10); // ex: "2024-2-19" >>> the same as above


export const getDateBeforeNumberOfDays = (date, days) => 
{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}