import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    const response = await fetch(
      "https://react-http-request-7a2bb-default-rtdb.firebaseio.com/meals.json"
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const meals = await response.json();

    let datas = [];
    for (let id in meals) {
      const meal = {
        id,
        name: meals[id].name,
        description: meals[id].description,
        price: meals[id].price
      };

      datas.push(meal);
    }
    setMeals(datas);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content = (
    <section className={classes.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );

  if (isLoading) {
    content = (
      <section className={classes.MealsLoading}>
        <p>Loadung...</p>
      </section>
    );
  }

  if (error !== null) {
    content = (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  return content;
};

export default AvailableMeals;
