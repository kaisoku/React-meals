import classes from "./Card.module.css";
const Card = (props) => {
  const className = `${classes.card}`;
  return <div className={className}>{props.children}</div>;
};

export default Card;
