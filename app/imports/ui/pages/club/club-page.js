import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'meteor/underscore';

import './club-page.html';

Template.Club_Page.onCreated(function onCreated() {
  this.currentIndex = new ReactiveVar(0);
});

Template.Club_Page.helpers({
});

Template.Club_Page.events({
  'click .next-to-right'(event, instance) {
    // console.log('clicked right button');
    // console.log(Template.instance().slides.get());
    // Template.instance().currentIndex.get()++;
    const slides = document.getElementsByClassName('myslides');
    let index = instance.currentIndex.get();
    let i;
    // console.log(instance.currentIndex.get());
    $(slides[index]).transition('fade right');
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    index = (index + 1) % slides.length;
    console.log(index);
    slides[index].style.display = 'block';
    $(slides[index]).transition('fade left');
    instance.currentIndex.set(index);
    // dots[i].className = dots[i].className.replace(" active", "");
  },
  'click .next-to-left': function () {
    console.log('clicked right button');
    $('.dog.image').transition('fade left');
    $('.dog.image').transition('fade right');
  },
  'click .huge.green.button': function () {
    console.log('apply');
    FlowRouter.route('/');
  },
});
