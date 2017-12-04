import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';

import './club-page.html';

Template.Club_Page.onCreated(function onCreated() {
  this.currentIndex = new ReactiveVar(0);
});

Template.Club_Page.helpers({
});

Template.Club_Page.events({
  'click .huge.green.button': function () {
    console.log('apply');
    FlowRouter.route('/');
  },
});
