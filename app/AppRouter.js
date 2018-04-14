import Index from 'views/index';
import Quiz from 'views/quiz';
import Error404 from 'views/404';

export default Marionette.AppRouter.extend({
  appRoutes: {
    '(/)': 'index',
    'quiz(/)': 'quiz',

    '*404': 'error404'
  },
  controller: {
    index() {
      window.showContent(new Index());
    },
    quiz() {
      window.showContent(new Quiz());
    },
    error404() {
      window.showContent(new Error404());
    }
  }
});
