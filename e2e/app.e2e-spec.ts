import { KairosFrontendPage } from './app.po';

describe('kairos-frontend App', () => {
  let page: KairosFrontendPage;

  beforeEach(() => {
    page = new KairosFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
