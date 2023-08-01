const sendComment = async (id,name,comment) => {
    console.log(id,name,comment);
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    "item_id": `${id}`,
    "username": `${name}`,
    "comment": `${comment}`
    }),
  };
  await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4xpeVqaPThzHz92jYyLe/comments`, options);
}

const getComment = async (id) => {
 const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4xpeVqaPThzHz92jYyLe/comments?item_id=${id}`, options);
  const data = await response.json();
  return data;
}


module.exports = {sendComment, getComment}