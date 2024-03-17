import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
import { useEffect,useState } from "react";

const ExpenseList = (prop) => {
  const expenses = prop.items;

  const userEmail = localStorage.getItem("email");

  const [fetchedExpenseItems, setFetchedExpenseItems] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://finance-app-671a9-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json?orderBy="Email"&equalTo="${userEmail}"`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong");
   
        }
        const data = await response.json();
        

        const loadedItems = [];

        for (const key in data) {
          loadedItems.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
            date: data[key].date,
            category: data[key].category,
          });
        }
        setFetchedExpenseItems(loadedItems);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [expenses, userEmail]);

  if (fetchedExpenseItems.length===0){
    return <h2 className="expenses-list__fallback">No Expense Found</h2>
  }
    return (
      <ul className="expenses-list">
        {fetchedExpenseItems.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            category={expense.category}
          />
        ))}
      </ul>
    );
};

export default ExpenseList;
