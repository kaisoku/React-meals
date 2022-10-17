import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const cartContxt = useContext(CartContext);
  const totalAmount = `$${cartContxt.totalAmount.toFixed(2)}`;
  const hasItem = cartContxt.items.length > 0;

  const show = (e) => {
    setShowForm((prevState) => !prevState);
  };

  const addToCortHandler = (item) => {
    cartContxt.addItem({ ...item, amount: 1 });
  };
  const removeFromCartHandler = (id) => {
    cartContxt.removeItem(id);
  };
  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartContxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeFromCartHandler.bind(null, item.id)}
          onAdd={addToCortHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && (
          <button className={classes.button} onClick={show}>
            Order
          </button>
        )}
      </div>
      <div>
        {showForm && (
          <Modal onClose={show}>
            <CartForm show={show} />
          </Modal>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
