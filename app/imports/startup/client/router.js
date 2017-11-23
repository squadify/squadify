import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

/*                        LANDING ROUTE                       */

export const landingPageRouteName = 'Landing_Page';
FlowRouter.route('/', {
  name: landingPageRouteName,
  action() {
    BlazeLayout.render('Landing_Layout', { main: landingPageRouteName });
  },
});

/*                        LIST PAGE                            */
export const listPage = 'List_Page';
FlowRouter.route('/list', {
  name: listPage,
  action() {
    BlazeLayout.render('List_Page', { main: listPage })
  },
});

export const searchPageRouteName = 'Search_Page';
FlowRouter.route('/search', {
  name: searchPageRouteName,
  action() {
    BlazeLayout.render('Search_Page', { main: searchPageRouteName });
  },
});

export const listPageRouteName = 'List_Page';
FlowRouter.route('/list', {
  name: searchPageRouteName,
  action() {
    BlazeLayout.render('List_Page', { main: listPageRouteName });
  },
});

/*                        DIRECTORY ROUTE                       */

function addDirectoryBodyClass() {
  $('body').addClass('directory-page-body');
}

function removeDirectoryBodyClass() {
  $('body').removeClass('directory-page-body');
}

export const directoryPageRouteName = 'Directory_Page';
FlowRouter.route('/directory', {
  name: directoryPageRouteName,
  action() {
    BlazeLayout.render('Directory_Layout', { main: directoryPageRouteName });
  },
  triggersEnter: [addDirectoryBodyClass],
  triggersExit: [removeDirectoryBodyClass],
});

/*                        USER ROUTES                      */

function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const filterPageRouteName = 'Filter_Page';
userRoutes.route('/filter', {
  name: filterPageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: filterPageRouteName });
  },
});
;

/*                        MISC ROUTES                       */
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('Page_Not_Found');
  },
};

/*                        CLUB ROUTE                       */

export const clubPageRoutName = 'Club_Page';
FlowRouter.route('/club', {
  name: clubPageRoutName,
  action() {
    BlazeLayout.render('Club_Layout', { main: clubPageRoutName });
  },
});

/*                        CLUB EDIT ROUTE                       */

export const clubEditPageRoutName = 'Club_Edit_Page';
FlowRouter.route('/club_edit', {
  name: clubEditPageRoutName,
  action() {
    BlazeLayout.render('Club_Edit_Layout', { main: clubEditPageRoutName });
  },
});