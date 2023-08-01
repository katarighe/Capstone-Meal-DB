import axios from 'axios';

const mealCount = document.querySelector('.meal-count');

const count = async () => {
    try {
        const response = await axios.get('');
        const result = response.data;
        const meals = result.splice(0, 12);
        mealCount.innerHTML = meals.length.toString();
    } catch (error) {
        console.error('Error:', error);
    }
};

export default count;