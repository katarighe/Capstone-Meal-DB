import axios from 'axios';
import getAppName from './local-storage.js';
import errorMessage from './error-message.js';

const likeMeal = async (idMeal) => {
  try {
    const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes`, {
      item_id: idMeal,
    });
    errorMessage(`Like ${response.data}`, 'green');
  } catch (error) {
    errorMessage('Error liking the meal', 'red');
  }
};

export default likeMeal;