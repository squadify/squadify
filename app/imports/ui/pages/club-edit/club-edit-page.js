import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

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
  'change .red.button': function() {
    let files = document.getElementById('file').files;
    for (let i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    }
  },
})
;
