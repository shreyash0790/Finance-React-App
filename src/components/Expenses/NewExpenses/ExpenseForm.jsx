/* eslint-disable react/no-unknown-property */
import { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (prop) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [isformVisble, setFormVisible] = useState(false);

  const showform = () => {
    setFormVisible(true);
  };
  const CancelHandler = () => {
    setFormVisible(false);
  };

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const AmountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const DateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const CategoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };


  

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
      category: enteredCategory,
    };
    prop.onSaveData(expenseData); //lifting the state
    setEnteredTitle(""); // reseting state to old values
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredCategory("");
  };
  return (
    <div>
      <button className="new-expense button.alternative" onClick={showform}>
        Add New Expense
      </button>
      {isformVisble && (
        <form onSubmit={submitHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Amount</label>
              <input
                type="number"
                steps="0.01"
                value={enteredAmount}
                onChange={AmountChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Date</label>
              <input
                type="date"
                min="2023-01-01"
                max="2025-01-01"
                value={enteredDate}
                onChange={DateChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Category</label>
              <select value={enteredCategory} onChange={CategoryChangeHandler}>
                <option value="">Select a category...</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="others">others</option>
              </select>
            </div>
          </div>
          <div className="new-expense__actions">
            <button type="submit">Add Expense</button>
            <button type="submit" onClick={CancelHandler}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
