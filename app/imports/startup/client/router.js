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

export const profilePageRouteName = 'Profile_Page';
FlowRouter.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('Profile_Page', { main: profilePageRouteName })
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

FlowRouter.route('/club-page/:_id', {
  name: 'Club_Page',
  action() {
    BlazeLayout.render('Club_Layout', { main: 'Club_Page' });
  },
});

/*                        CLUB EDIT ROUTE                       */

FlowRouter.route('/list-page/:_id', {
  name: 'List_Page',
  action() {
    BlazeLayout.render('List_Page', { main: 'List_Page' });
  },
});

FlowRouter.route('/club-edit/:_id', {
  name: 'Club_Edit_Page',
  action() {
    BlazeLayout.render('Club_Edit_Layout', { main: 'Club_Edit_Page' });
  },
});

FlowRouter.route('/add-club/', {
  name: 'Club_Add_Page',
  action() {
    BlazeLayout.render('Club_Add_Page', { main: 'Club_Add_Page' });
  },
});

FlowRouter.route('/search/', {
  name: 'Search_Page',
  action() {
    BlazeLayout.render('Search_Page', { main: 'Search_Page' });
  },
});

FlowRouter.route('/search/:parameters', {
  name: 'Search_Page',
  action() {
    BlazeLayout.render('Search_Page', { main: 'Search_Page' });
  },
});