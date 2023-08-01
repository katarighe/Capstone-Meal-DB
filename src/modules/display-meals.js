import axios from "axios";
import count from "./meal-count.js";
import errorMsg from "./error-message.js";
import fetchLikes from "./display-likes.js";
import likeMeal from "./likes.js";
// import heart from '../';

const displayList = async () => {
  try {
    const response = await axios.get(
      "http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
    );
    const result = response.data;
    const meals = result.splice(0, 15);

    meals.forEach(async (meal) => {
      const img = document.createElement("img");
      img.setAttribute("src", heart);
      img.className = "like-icon";
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <img src="${meal.image.medium}" alt="${meal.name}" class="image">
          <h3>${meal.name}</h3>
          <div class="card-body">
            <button class="commentBtn">Comment</button>
            <p>${img.outerHTML}<span class="like-count">0</span> Likes</p>
          </div>
        `;
      displayMeals.appendChild(card);

      const likeCount = card.querySelector(".like-count");
      const likes = await fetchLikes(meal.id);
      likeCount.textContent = `${likes}`;

      const likeIcon = card.querySelector(".like-icon");
      likeIcon.addEventListener("click", async () => {
        await likeMeal(meal.id);
        const likes = await fetchLikes(meal.id);
        likeCount.textContent = `${likes}`;
      });

      const commentBtn = card.querySelector("commentBtn");
      const popContainer = document.querySelector("popContainer");
      commentBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const mealid = meal.id;
        await displayCommentPop(mealid);
        document.body.style.overflow = "hidden";
        popContainer.style.display = "block";
      });
    });
  } catch (error) {
    errorMsg("Error!", 'red');
  }
};

export default displayList;