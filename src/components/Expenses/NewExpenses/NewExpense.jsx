import { useContext } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import { v4 as uuidv4 } from 'uuid';
import AuthContext from "../../Context/AuthContext";

const NewExpense = (prop) => {


  const authCtx=useContext(AuthContext)
const expenseDataHandler= async (expenseData)=>{
  
  try {
    const updatedExpenseData={
      ...expenseData,
      id:uuidv4()
  }
  prop.onAddExpense(updatedExpenseData);

    await fetch(
      "https://finance-app-671a9-default-rtdb.asia-southeast1.firebasedatabase.app/expense.json",
      {
        method: "POST",
        body: JSON.stringify({...expenseData,Email:authCtx.email}),
      }
    );


  } catch (err) {
    console.log(err);
  }

}




  return (
    <div className="new-expense">
      <ExpenseForm onSaveData={expenseDataHandler} />
    </div>
  );
};

export default NewExpense;
