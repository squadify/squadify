import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';


Template.page_header.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.page_header.helpers({
  clublist() {
    let user = Meteor.users.find().fetch()[0].profile.name;
    let club = _.filter(Clubs.findAll(), function(club){ return _.find(club.leaders, function(leaders){ return leaders === user})});
    return club;
  },

  list() {
    let user = Meteor.users.find().fetch()[0].profile.name;
    let clubs = _.filter(Clubs.findAll(), function(club){ return _.find(club.leaders, function(leaders){ return leaders === user})});
    console.log(clubs);
    if(clubs.length > 0) {
      return true;
    }
    return false;//list.length;
  },

});

Template.page_header.events({
  'click .ui.dropdown.item': function () {
    $('.ui.dropdown.item').dropdown('refresh');
    $('.ui.dropdown.item').dropdown('clear');
    $('.ui.dropdown .text').html('CLUB EDIT');
  }
});
