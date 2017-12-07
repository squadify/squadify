import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { ReactiveVar } from 'meteor/reactive-var';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

import './slideshow.html';

let first = true;

Template.Slideshow.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.currentIndex = new ReactiveVar(0);
});

Template.Slideshow.helpers({
  club() {
    // clubs(name) name wil be aloha-nave
    // replace - with space before find
    const name = 'American Society of Civil Engineers';
    return Clubs.find({ name: new RegExp('^' + name + '$', 'i') });
    // return Clubs.find({}, { sort: { name: 1 } });
    // return Clubs.find({}, { sort: { name: 1 } });
  },
  firstIndex() {
    if (first) {
      first = false;
      return true;
    }
    return false;
  },
});

Template.Slideshow.events({
  'click .next-to-right'(event, instance) {
    // console.log('clicked right button');
    event.preventDefault();
    const slides = document.getElementsByClassName('myslide');
    const box = document.getElementsByClassName('slidebox');
    const currentIndex = instance.currentIndex.get();
    const nextIndex = (currentIndex > 0) ? (currentIndex - 1) : slides.length - 1;
    // console.log(nextIndex);
    // console.log(slides);
    // console.log(currentIndex);
    // console.log(nextIndex);
    $(box)
        .transition('fade left', '300ms', function () {
          slides[currentIndex].style.display = 'none';
          slides[nextIndex].style.display = 'block';
        })
        .transition('fade right', '300ms', function () {
        })
    ;
    instance.currentIndex.set(nextIndex);
  },
  'click .next-to-left'(event, instance) {
    // console.log('clicked left button');
    event.preventDefault();
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
