import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

let club;

Template.page_header.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  const name = 'American Society of Civil Engineers';
  club = Clubs.find({ name: new RegExp('^' + name + '$', 'i') });
});

Template.page_header.helpers({
  club() {
    // clubs(name) name wil be aloha-nave
    // replace - with space before find
    const name = 'American Society of Civil Engineers';
    club = Clubs.find({ name: new RegExp('^' + name + '$', 'i') });
    return club;
    // return Clubs.find({}, { sort: { name: 1 } });
    // return Clubs.find({}, { sort: { name: 1 } });
  },
  authorized() {
    // Only logged in users can see a page protected by this template.
    if (!Meteor.user()) {
      // console.log('isAuthorized', 'not logged in');
      return false;
    }

    // Check that the current user is accessing a page in their area.
    const routeUserName = FlowRouter.getParam('username');
    console.log(routeUserName);
    console.log(club.name);
    // const loggedInUserName = Meteor.user().profile.name;
    // return (routeUserName === loggedInUserName);
    return true;
  },
});

Template.page_header.events({
});
