import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighLighted] = useState(false);
  const cartContext = useContext(CartContext);
  const numberOfItems = cartContext.items.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);
  const btnClasses = `${classes.button}  ${
    buttonIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (cartContext.items.length === 0) return;
    setButtonIsHighLighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
