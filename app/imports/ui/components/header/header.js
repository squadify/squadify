import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

Template.page_header.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.page_header.helpers({
  authorized() {
    // Only logged in users can see a page protected by this template.
    if (!Meteor.user()) {
      // console.log('isAuthorized', 'not logged in');
      return false;
    }

    // Check that the current user is accessing a page in their area.
    const routeUserName = FlowRouter.getParam('username');
    console.log(routeUserName);
    // const loggedInUserName = Meteor.user().profile.name;
    // return (routeUserName === loggedInUserName);
    return true;
  },
});

Template.page_header.events({
});
