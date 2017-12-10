import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Meteor } from 'meteor/meteor';

let id;

Template.Club_Edit_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  id = FlowRouter.getParam('_id');
});

Template.Club_Edit_Page.helpers({
  club() {
    // clubs(name) name wil be aloha-nave
    // replace - with space before find'
    const club = _.find(Clubs.findAll(), function (clubb) {
      return clubb._id === id;
    });
    return club;
  },
});

Template.Club_Edit_Page.events({
  'click .next-to-right': function () {
    console.log('clicked right button');
    $('.dog.image').transition('fade right');
    $('.dog.image').transition('fade left');
  },
  'click .next-to-left': function () {
    console.log('clicked right button');
    $('.dog.image').transition('fade left');
    $('.dog.image').transition('fade right');
  },
  'click .red.buttonnnnnn': function () {
    console.log('red button');
    console.log(document.getElementById('file').files);
    // console.log(Files);
  },
  'click .red.buttonnn': function () {
    const files = document.getElementById('file').files;
    console.log(files);
    _.each(files, function (file) {
      Meteor.saveFile(file, file.name);
    });
  },
  'click .red.button': function (event) {
    _.each(event.currentTarget.files, function (file) {
      Meteor.saveFile(file, file.name);
    });
    console.log('ran');
  },
});
