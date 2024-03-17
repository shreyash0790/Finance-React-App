import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/Expenses/NewExpenses/NewExpense";
import { useState } from "react";

const Expense = function () {
  const [newExpense, setExpense] = useState([]);

  const addExpense = (newExpense) => {
    setExpense((prevExpense) => [...prevExpense, newExpense]);
  };

  return (
    <div className="  bg-center  object-fill h-screen w-full bottom-0   ">
      <div className="  flex justify-center h-full ">
        <div className="container  flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
          <NewExpense onAddExpense={addExpense} />
        <div  className=" ml-5 "> <Expenses items={newExpense} /> </div>
         
        </div>
      </div>
    </div>
  );
};

export default Expense;
