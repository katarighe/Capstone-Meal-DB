import axios from '../../__mocks__/axios.js';
import mealCount from './mealsCount.js';

describe('Count total meals available', () => {
  let mealCountElement;

  beforeEach(() => {
    // Create a dummy mealsCount element in the document body
    mealCountElement = document.createElement('div');
    mealCountElement.className = 'meals-count';
    document.body.appendChild(mealCountElement);
  });

  afterEach(() => {
    // Remove the mealsCount element from the document body after each test
    mealCountElement.remove();
  });

  it('test_api_call_failure', async () => {
    const mockAxios = jest.spyOn(axios, 'get').mockRejectedValue(new Error('API call failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await mealCount();
    expect(mockAxios).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
    expect(consoleSpy).toHaveBeenCalledWith('Error:', new Error('API call failed'));
  });

  it('test_api_response_data_not_in_expected_format', async () => {
    const response = { data: {} };
    jest.spyOn(axios, 'get').mockResolvedValue(response);
    await mealCount();
    expect(console.error).toHaveBeenCalledWith('Error:', expect.anything());
  });
});