
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "../UI/Card";

function ExpenseItem(props) {
 
  return (
    <ul>
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">{props.amount} ₹</div>
        <div className="expense-item__category">{props.category} </div>

      </div>
    </Card>
    </ul>
  );
}

export default ExpenseItem;
