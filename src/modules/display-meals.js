import axios from 'axios';
import likeMeal from './add-likes.js';
import heart from '..';
import displayCommentPop from './popupComment.js';
import fetchLikes from './display-likes.js';
import count from './meal-count.js';
import errorMessage from './error-message.js';

const displayMeals = document.querySelector('.display-meals');

count();

const displayList = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    const data = response.data;
    const meals = data.meals;

    meals.forEach(async (meals) => {
      const img = document.createElement('img');
      img.setAttribute('src', heart);
      img.className = 'like-icon';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
          <img src='${meals.strMealThumb}' alt='${meals.strMeal}' class="image">
          <h3>${meals.strMeal}</h3>
          <div class="card-body">
            <button class="commentBtn">Comments</button>
            <p>${img.outerHTML}<span class="like-count">0</span> Likes</p>
          </div>
        `;
      displayMeals.appendChild(card);

      const likeCount = card.querySelector('.like-count');
      const likes = await fetchLikes(meal.idMeal);
      likeCount.textContent = `${likes}`;

      const likeIcon = card.querySelector('.like-icon');
      likeIcon.addEventListener('click', async () => {
        await likeMeal(meals.idMeal);
        const likes = await fetchLikes(meals.idMeal);
        likeCount.textContent = `${likes}`;
      });

      const commentBtn = card.querySelector('.commentBtn');
      const popContainer = document.querySelector('.popContainer');
      commentBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const mealsid = meals.idMeal;
        await displayCommentPop(mealsid);
        document.body.style.overflow = 'hidden';
        popContainer.style.display = 'block';
      });
    });
  } catch (error) {
    errorMessage('Error!', 'red');
  }
};

export default displayList;