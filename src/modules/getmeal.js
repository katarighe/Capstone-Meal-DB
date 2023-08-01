const getMeal =  async(id)=> {

    const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`);
    const data = await response.json();
    return data.meals[0];
  }
  
  module.exports = getMeal