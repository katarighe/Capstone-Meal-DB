import axios from 'axios';

const mealsCount = document.querySelector('.meals-count');

const count = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    const data = response.data;
    const meals = data.meals;
    mealsCount.innerHTML = meals.length.toString();
  } catch (error) {
    console.error('Error!:', error);
  }
};

export default count;