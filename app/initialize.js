require('foundation-sites');

import Application from 'Application';

$(() => {
  window.app = new Application;
  window.showContent = view => window.app.getView().showChildView("content", view);

  window.app.start();
});

$(document).foundation();
