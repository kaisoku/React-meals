import { useContext } from "react";
import CartContext from "../../store/cart-context";
import useInput from "../../hooks/use-input";

import classes from "./CartForm.module.css";

const inputValidation = (value) => value.trim() !== "";
const postalValidation = (value) => value.trim().length === 5;
const CartForm = (props) => {
  const cartCtx = useContext(CartContext);

  const {
    value: name,
    inputIsValid: nameIsValid,
    hasError: nameHasError,
    reset: resetName,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler
  } = useInput(inputValidation);

  const {
    value: street,
    inputIsValid: streetIsValid,
    hasError: streetHasError,
    reset: resetStreet,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler
  } = useInput(inputValidation);

  const {
    value: postal,
    inputIsValid: postalIsValid,
    hasError: postalHasError,
    reset: resetPostal,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler
  } = useInput(postalValidation);

  const {
    value: city,
    inputIsValid: cityIsValid,
    hasError: cityHasError,
    reset: resetCity,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler
  } = useInput(inputValidation);

  const formIsValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const orders = {
      user: {
        name,
        street,
        postal,
        city
      },
      cartContent: cartCtx.items
    };

    fetch(
      "https://react-http-request-7a2bb-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(orders)
      }
    );

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
    cartCtx.resetItems();
    props.show();
  };

  const nameClasses = nameHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const streetClasses = streetHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const postalClasses = postalHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const cityClasses = cityHasError
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  return (
    <form onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && (
          <p className={classes["error-text"]}>Please Enter a Name</p>
        )}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Your Street Adress</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className={classes["error-text"]}>Please Enter a Street Adrss</p>
        )}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Your Postal Adress</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className={classes["error-text"]}>Please enter a Postal Adress</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">Your City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && (
          <p className={classes["error-text"]}>Please enter a Street Adress</p>
        )}
      </div>
      <button type="submit" disabled={!formIsValid}>
        Submit
      </button>
    </form>
  );
};

export default CartForm;
