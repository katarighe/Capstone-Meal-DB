import axios from 'axios';

const mealCount = document.querySelector('.meal-count');

const count = async () => {
  try {
    const response = await axios.get('http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    const data = response.data;
    const meals = data.meals;
    mealCount.innerHTML = meals.length.toString();
  } catch (error) {
    console.error('Error!:', error);
  }
};

export default count;