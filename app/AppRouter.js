import Index from 'views/index';
import Quiz from 'views/quiz';
import Error404 from 'views/404';

import Query from 'classes/Query';

const getAttributes = query => (new Query(query)).getAttributes();

export default Marionette.AppRouter.extend({
  appRoutes: {
    '(/)': 'index',
    'quiz(/)': 'quiz',

    '*404': 'error404'
  },
  controller: {
    index(query) { window.showContent(new Index(getAttributes(query))); },
    quiz(query) { window.showContent(new Quiz(getAttributes(query))); },
    error404(route, query) { window.showContent(new Error404({route, query: getAttributes(query)})); }
  }
});
