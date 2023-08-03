import axios from './__mocks__/axios';
import mealsCount from './mealsCount.js';

describe('mealsCount', () => {
    it('Should get the number of seafood meals', async () => {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        const data = response.data;
        const meals = data.meals;
        const expectedCount = meals.length;
    
        await mealsCount();
    
        const actualCount = document.querySelector('.meals-count').innerHTML;
        expect(actualCount).toBe(expectedCount);
    });
});

it('test_api_call_failure', async () => {
    const mockAxios = jest.spyOn(axios, 'get').mockRejectedValue(new Error('API call failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await count();
    expect(mockAxios).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    expect(consoleSpy).toHaveBeenCalledWith('Error:', new Error('API call failed'));
  });

  it('test_api_response_data_not_in_expected_format', async () => {
    const response = { data: {} };
    jest.spyOn(axios, 'get').mockResolvedValue(response);
    await count();
    expect(console.error).toHaveBeenCalledWith('Error:', expect.anything());
  });