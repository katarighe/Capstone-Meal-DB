import axios from 'axios';
import errorMsg from './error-message.js';

const likeMeal = async (mealId) => {
  try { 
    const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes`, {
      item_id: mealId,
    });
    errorMsg(`Meal like ${response.data}`, 'green');
  } catch (error) {
    errorMsg('Error liking the meal', 'red');
  }
};
    
export default likeMeal;