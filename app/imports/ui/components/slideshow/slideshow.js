import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { ReactiveVar } from 'meteor/reactive-var';

import './slideshow.html';

Template.Slideshow.onCreated(function onCreated() {
  this.currentIndex = new ReactiveVar(0);
});

Template.Slideshow.helpers({
});

Template.Slideshow.events({
  'click .next-to-right'(event, instance) {
    // console.log('clicked right button');
    const slides = document.getElementsByClassName('myslide');
    const box = document.getElementsByClassName('slidebox');
    const currentIndex = instance.currentIndex.get();
    const nextIndex = (currentIndex > 0) ? (currentIndex - 1) : slides.length - 1;
    // console.log(nextIndex);
    $(box)
        .transition('fade left', '500ms', function () {
          slides[currentIndex].style.display = 'none';
          slides[nextIndex].style.display = 'block';
        })
        .transition('fade right', '500ms', function () {
        })
    ;
    instance.currentIndex.set(nextIndex);
  },
  'click .next-to-left'(event, instance) {
    // console.log('clicked left button');
    const slides = document.getElementsByClassName('myslide');
    const box = document.getElementsByClassName('slidebox');
    const currentIndex = instance.currentIndex.get();
    const nextIndex = (currentIndex + 1) % slides.length;
    $(box)
        .transition('fade right', '500ms', function () {
          slides[currentIndex].style.display = 'none';
          slides[nextIndex].style.display = 'block';
        })
        .transition('fade left', '500ms', function () {
        })
    ;
    instance.currentIndex.set(nextIndex);
  },
});
