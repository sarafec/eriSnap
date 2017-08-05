import { EriSnapPage } from './app.po';

describe('eri-snap App', () => {
  let page: EriSnapPage;

  beforeEach(() => {
    page = new EriSnapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
