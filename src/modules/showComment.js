const showComment =async(id) => {
    xconst header = document.querySelector('header')
    const mainContainer = document.getElementById('container');
    const footer = document.querySelector('footer');
    header.style.display = 'none';
    mainContainer.style.display = 'none';
    footer.style.display = 'none';

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

    addCommentBtn.addEventListener("click",async() =>{
        await sendComment(id,name.value,comment.value);
        name.value = ''
        comment.value = ''
    })

     container.innerHTML = `<div class=""><img src="" alt="img"/>
                            <button class="close">X</button>
                            </div>
                            <h2></h2>  
                            <div class="character">
                                <span class="first-span"></span>
                                <span class="second-span"></span>
                            </div>
                            <div class="character">
                                <span class="first-span"></span> 
                                <span class="second-span"></span>
                            </div>
                            <p>Comments(2)</p>
                            <p>Add a comment </p>
                          `

    addComment.appendChild(name);
    addComment.appendChild(comment);
    addComment.appendChild(addCommentBtn);
    container.appendChild(addComment);
    document.body.appendChild(container);

    // const close = document.querySelector('.close');
    //   close.addEventListener("click",() =>{
    //     document.body.removeChild(container);
    //       header.style.display = 'flex';
    // mainContainer.style.display = 'grid';
    // })
}

module.exports = showComment