import axios from './__mocks__/axios';
import count from './mealsCount.js';

describe('Count total movies', () => {
    let mealsCountElement;
  
    beforeEach(() => {
      // Create a dummy mealCount element in the document body
      mealsCountElement = document.createElement('div');
      mealsCountElement.className = 'meal-count';
      document.body.appendChild(mealsCountElement);
    });
  
    afterEach(() => {
      // Remove the mealCount element from the document body after each test
      mealsCountElement.remove();
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
});