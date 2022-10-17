import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false
};
const inputReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      value: action.value,
      isTouched: state.isTouched
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isTouched: true
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false
    };
  }
  return initialInputState;
};
const useInput = (inputValidation) => {
  const [inputSate, dispatch] = useReducer(inputReducer, initialInputState);

  const inputIsValid = inputValidation(inputSate.value);
  const hasError = !inputIsValid && inputSate.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({ type: "INPUT_CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "INPUT_BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputSate.value,
    inputIsValid,
    hasError,
    reset,
    inputChangeHandler,
    inputBlurHandler
  };
};

export default useInput;
