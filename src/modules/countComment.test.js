import commentCounter from './countComment.js';

describe('commentCounter', () => {
  it('Displays the correct comment count', async () => {
    document.body.innerHTML = '<span class="counter"></span><div class="commentDiv"><p>Comment 1</p><p>Comment 2</p></div>';
    await commentCounter();
    const counterElement = document.querySelector('.counter');
    expect(counterElement.textContent).toBe('(2)');
  });
  it('Displays the correct comment count when no comments', async () => {
    document.body.innerHTML = '<span class="counter"></span><div class="commentDiv"></div>';
    await commentCounter();
    const counterElement = document.querySelector('.counter');
    expect(counterElement.textContent).toBe('(0)');
  });
});