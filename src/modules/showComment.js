const getMeal = require("./getMeal");
const { getComment, sendComment } = require("./sendComment");

const showComment =async(id) => {
    // const header = document.querySelector('header')
    // const mainContainer = document.getElementById('container');
    // const footer = document.querySelector('footer');
    // header.style.display = 'none';
    // mainContainer.style.display = 'none';
    // footer.style.display = 'none';

    const meal = await getMeal(id);

    const container = document.createElement("div");
    const addComment = document.createElement('div');
    const name = document.createElement('input');
    const comment = document.createElement('textarea');
    const addCommentBtn = document.createElement('button');

    container.className = "comment-container";
    addComment.className = "add-comment";
    name.className = "name";
    comment.className = "comment"
    addCommentBtn.className = "add-comment-btn";

    name.type = "text";
    name.placeholder = "Your name"
    comment.placeholder = "Your comment"
    addCommentBtn.innerHTML = 'Comment'

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
                               
                            </div>
                            <p>Comments(2)</p>
                            <p>Add a comment </p>
                            <ul id="comment-list"></ul>
                          `

    addComment.appendChild(name);
    addComment.appendChild(comment);
    addComment.appendChild(addCommentBtn);
    container.appendChild(addComment);
    document.body.appendChild(container);

    const commentList = document.getElementById('comment-list');
    const comments = await getComment(id);
    comments.forEach((comment)=>{
        const commentItem = document.createElement('li');
        commentItem.innerHTML = `<p>
                                    ${comment.creation_date} ${comment.username}:${comment.comment}
                                </p>`;

        commentList.appendChild(commentItem);
    })

    addCommentBtn.addEventListener("click",async() =>{
        await sendComment(id,name.value,comment.value);
        name.value = ''
        comment.value = ''
        const comments = await getComment(id);
        const newComment = comments[comments.length - 1]; 
        const commentList = document.getElementById('comment-list');
         const commentItem = document.createElement('li');
        commentItem.innerHTML = `<p>
                                    ${newComment.creation_date} ${newComment.username}:${newComment.comment}
                                </p>`;

        commentList.appendChild(commentItem);
    })


    // const close = document.querySelector('.close');
    //   close.addEventListener("click",() =>{
    //     document.body.removeChild(container);
    //       header.style.display = 'flex';
    // mainContainer.style.display = 'grid';
    // })
}

module.exports = showComment