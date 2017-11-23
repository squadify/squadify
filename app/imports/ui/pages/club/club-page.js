import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.Club_Page.onCreated(function onCreated() {
});

Template.Club_Page.helpers({
});

Template.Club_Page.events({
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
  'submit .huge.green.button'(event, instance) {
    console.log('apply');
  },
});
