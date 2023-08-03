import axios from 'axios';
import getAppName from './local-storage.js';
import errorMessage from './error-message.js';

const fetchLikes = async (idMeal) => {
  try {
    const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/likes/`);
    const likes = response.data;
    const itemLikes = likes.find((like) => like.item_id === idMeal);
    return itemLikes ? itemLikes.likes : 0;
  } catch (error) {
    errorMessage('Error!', 'red');
    return 0;
  }
};

export default fetchLikes;