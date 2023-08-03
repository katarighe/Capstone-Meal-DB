import axios from 'axios';
import closeImg from '../assets/image01.png';
import getAppName from './local-storage.js';
import commentCounter from './countComment.js';
import errorMessage from './error-message.js';

const fetchMeal = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(url);
    const meals = await response.json();
    return meals.meals[0];
  };
  
const postComments = async (id, username, comment) => {
  console.log(id,username,comment);
    const response = await axios.post(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/comments`, {
        item_id: id,
        username,
        comment,
    });

    const commentDiv = document.querySelector('.commentDiv');
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    const p = document.createElement('p');
    p.innerHTML = `
    ${today}  ${username}: ${comment}
  `;
  commentDiv.appendChild(p);
  errorMessage(response.data, 'green');
  commentCounter();
};

const displayComments = async (id) => {
    try {
      const response = await axios.get(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${getAppName()}/comments?item_id=${id}`);
      const comments = response.data;
  
      const commentsContainer = document.querySelector('.commentDiv');
      commentsContainer.innerHTML = '';
  
      comments.forEach((comment) => {
        const newComment = document.createElement('p');
        newComment.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment}`;
        commentsContainer.appendChild(newComment);
      });
    } catch (error) {
      errorMessage('Error!', 'red');
    }
    commentCounter();
  };

const popContainer = document.querySelector('.popContainer');
const displayCommentPop = async (idMeal) => {
  const mealDetails = await fetchMeal(idMeal);
  console.log(mealDetails);
  const popup = document.createElement('div');
  popup.classList.add('popup');
  const img = document.createElement('img');
  img.setAttribute('src', closeImg);
  img.className = 'closeBtn';
  popup.innerHTML = `
    <div class="pop">
      ${img.outerHTML}
      <img class="img" src="${mealDetails.strMealThumb}" alt="img" />
      <div class="character">
      <h2 class= "meal-name">${mealDetails.strMeal}</h2>
      <div class="character">
      <p>Origin : ${mealDetails.strArea}</p>
      <p>Category : ${mealDetails.strCategory}</p>
      </div>
      <div class="character">
      <p>Type : ${mealDetails.strTags}</p> 
      <p>Ingredients : ${mealDetails.strIngredient1},${mealDetails.strIngredient2},${mealDetails.strIngredient3},${mealDetails.strIngredient4}</p> 
      </div>
      <h4 class="comment-count">Comments <span class="counter"></span></h4>
      <div class="commentDiv">
      </div>
      <div class="formDiv">
        <h2>Add a Comment</h2>
        <form class="commentForm">
          <input type="text" class="nameField" placeholder="Your name" />
          <textarea class="commentField" placeholder="Your remarks" rows="5" cols="30"></textarea>
          <button type="submit" id="${mealDetails.idMeal}" class="addComment">Add Comment</button>
        </form>
      </div>
    </div>
  `;

  popContainer.appendChild(popup);
  const close = document.querySelector('.closeBtn');
  close.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    popContainer.style.display = 'none';
    window.location.reload();
  });

  const addComment = document.querySelector('.commentForm');
  addComment.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('.nameField').value;
    const comment = document.querySelector('.commentField').value;
    if (username.trim() === '' || comment.trim() === '') {
      errorMessage('All fields are required', 'red');
    } else {
      postComments(mealDetails.idMeal, username, comment);
      displayComments(mealDetails.idMeal);
      addComment.reset();
    }
  });
  displayComments(mealDetails.idMeal);
};

export default displayCommentPop;