import { CodingpracticePage } from './app.po';

describe('codingpractice App', () => {
  let page: CodingpracticePage;

  beforeEach(() => {
    page = new CodingpracticePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
