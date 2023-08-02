const getMeal = require('./getMeal');
const { getComment, sendComment } = require('./sendComment');

const showComment = async (id) => {
<<<<<<< HEAD
  // const header = document.querySelector('header')
  // const mainContainer = document.getElementById('container');
  // const footer = document.querySelector('footer');
  // header.style.display = 'none';
  // mainContainer.style.display = 'none';
  // footer.style.display = 'none';

  const meal = await getMeal(id);

=======
  const header = document.querySelector('header');
  const mainContainer = document.getElementById('container');
  const footer = document.querySelector('footer');
  header.style.display = 'none';
  mainContainer.style.display = 'none';
  footer.style.display = 'none';

  const meal = await getMeal(id);
  console.log(meal);
>>>>>>> 518ca5f3347ae7b82934437e76c3fbfdf19bf0a7
  const container = document.createElement('div');
  const addComment = document.createElement('div');
  const name = document.createElement('input');
  const comment = document.createElement('textarea');
  const addCommentBtn = document.createElement('button');

  container.className = 'comment-container';
  addComment.className = 'add-comment';
  name.className = 'name';
  comment.className = 'comment';
  addCommentBtn.className = 'add-comment-btn';

  name.type = 'text';
  name.placeholder = 'Your name';
  comment.placeholder = 'Your comment';
  addCommentBtn.innerHTML = 'Comment';

<<<<<<< HEAD
  container.innerHTML = `<div class=""><img src="${meal.strMealThumb}" alt="img"/>
                            <button class="close">X</button>
                            </div>
                            <h2>${meal.strMeal}</h2>  
                            <div class="character">
                                <span class="first-span">Origin:${meal.strArea}</span>
                                <span class="second-span">Category:${meal.strCategory}</span>
                            </div>
                            <div class="character">
                                <span class="first-span">Type:${meal.strTags}</span> 
                               
=======
  container.innerHTML = `<div class="image-x"><img src="${meal.strMealThumb}" alt="img"/>
                            <button>X</button>
                            </div>
                            <h2 class= "meal-name">${meal.strMeal}</h2>  
                            <div class="character">
                                <p>Origin:${meal.strArea}</p>
                                <p>Category:${meal.strCategory}</p>
                            </div>
                            <div class="character">
                                <p>Type:${meal.strTags}</p> 
                                <p>Ingredient:${meal.strIngredient3}</p> 
>>>>>>> 518ca5f3347ae7b82934437e76c3fbfdf19bf0a7
                            </div>
                            <p>Comments(2)</p>
                            <p>Add a comment </p>
                            <ul id="comment-list"></ul>
                          `;

  addComment.appendChild(name);
  addComment.appendChild(comment);
  addComment.appendChild(addCommentBtn);
  container.appendChild(addComment);
  document.body.appendChild(container);

  const commentList = document.getElementById('comment-list');
  const comments = await getComment(id);
  comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `<p>
                                    ${comment.creation_date} ${comment.username}:${comment.comment}
                                </p>`;

    commentList.appendChild(commentItem);
  });

  addCommentBtn.addEventListener('click', async () => {
<<<<<<< HEAD
    await sendComment(id, name.value, comment.value);
    name.value = '';
    comment.value = '';
    const comments = await getComment(id);
    const newComment = comments[comments.length - 1];
    const commentList = document.getElementById('comment-list');
    const commentItem = document.createElement('li');
    commentItem.innerHTML = `<p>
                                    ${newComment.creation_date} ${newComment.username}:${newComment.comment}
                                </p>`;

    commentList.appendChild(commentItem);
=======
    if (name.value !== '' && comment.value !== '') {
      await sendComment(id, name.value, comment.value);
      const comments = await getComment(id);
      const newComment = comments[comments.length - 1];
      const commentList = document.getElementById('comment-list');
      const commentItem = document.createElement('li');
      commentItem.innerHTML = `<p>
                                    ${newComment.creation_date} ${newComment.username}:${newComment.comment}
                                </p>`;

      commentList.appendChild(commentItem);
    }
    name.value = '';
    comment.value = '';
>>>>>>> 518ca5f3347ae7b82934437e76c3fbfdf19bf0a7
  });

  // const close = document.querySelector('.close');
  //   close.addEventListener("click",() =>{
  //     document.body.removeChild(container);
  //       header.style.display = 'flex';
  // mainContainer.style.display = 'grid';
  // })
};

module.exports = showComment;