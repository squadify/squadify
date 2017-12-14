import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { ReactiveDict } from 'meteor/reactive-dict';

const ClubSchema = new SimpleSchema({
  // Remainder are optional
  name: { type: String, optional: true },
  leaders: { type: Array, optional: true },
  'leaders.$': { type: String },
  bio: { type: String, optional: true },
  tags: { type: Array, optional: true },
  'tags.$': { type: String },
  pictures: { type: Array, optional: true },
  'pictures.$': { type: SimpleSchema.RegEx.Url },
  email: { type: SimpleSchema.RegEx.Url, optional: true },
  facebook: { type: SimpleSchema.RegEx.Url, optional: true },
  instagram: { type: SimpleSchema.RegEx.Url, optional: true },
});

let id;
let pictures = ['www.squdify.com', 'www.google.come', 'www.github.com'];
const newid = 'ETCezPNgo9icxqtGe';

Template.Club_Edit_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  id = FlowRouter.getParam('_id');
  this.context = ClubSchema.namedContext('Club_Edit_Page');
});

Template.Club_Edit_Page.helpers({
  club() {
    const club = _.find(Clubs.findAll(), function (clubb) {
      return clubb._id === id;
    });
    return club && club;
  },
  clubFeild(field) {
    const club = _.find(Clubs.findAll(), function (clubb) {
      return clubb._id === id;
    });
    if (field === 'name' || field === 'facebook' || field === 'instagram' || field === 'email') {
      return club && club[field].replace('https://', '');
    }
    return club && club[field];
  },
  pictures() {
    return pictures;
  },
  tags() {
  },
});

Template.Club_Edit_Page.events({
  'click .green.button'(event, instance) {
    event.preventDefault();
    const name = $('.iname').val();
    const leaders = $('.ileaders').val().split(',');
    const bio = $('.itext').val();
    const pictures = ["http://shrmuhm.com/wp-content/uploads/2012/07/TheSHRMAloha_Logo-300x300.jpg", "/images/vietnamese_student_organization_officers.jpg"];
    const email = $('.iemail').val();
    const facebook = $('.ifacebook').val();
    const twitter = $('.itwitter').val();
    const instagram = $('.iinstagram').val();

    console.log(bio);
    console.log(email);
    console.log(facebook);
    console.log(twitter);
    console.log(instagram);
    console.log(instance);
    console.log(instance.context);
    const newClubData = { name, leaders, bio, pictures, email, facebook, twitter, instagram };
    // Clear out any old validation errors.
    //instance.context.resetValidation();
    // Invoke clean so that newClubData reflects what will be inserted.
    ClubSchema.clean(newClubData);
    // Determine validity.
    instance.context.validate(newClubData);
    if (instance.context.isValid()) {
      console.log('true');
      Clubs.update({ '_id': id },
        {
          $set: {
            'name': newClubData.name,
            'leaders' : newClubData.leaders,
            'bio': newClubData.bio,
            'email': newClubData.email,
            'facebook': newClubData.facebook,
            'twitter': newClubData.twitter,
            'instagram': newClubData.instagram,
          },
          $push: { 'pictures': { $each: newClubData.pictures } },
        });

      //Contacts.insert(newClubData);
      //FlowRouter.go('Home_Page');
    } else {
      console.log('false');
    }
  },
  'click .tiny.button': function (event) {
    event.preventDefault();
    console.log(event.target.value);
    //console.log(event.Target.mypic.dataset.value);
    //var fired_button = $(this).val();
    //console.log(fired_button)
    //$("#div1").remove();
  },
  'click .myadd': function () {
    const url = $('.iurl').val();
    pictures.push(url);
    console.log(pictures);
    const insert = '<tr>\n' +
        '            <td>' + url + '</td>\n' +
        '            <td class="myrow">\n' +
        '              <button class="ui tiny square button mypic" name="Picture" value="' + url + '">\n' +
        '            </td>\n' +
        '          </tr>';

    $('.mytable').append(insert);
  },
  'click .myadddddd': function () {
    Clubs.removeIt(newid);
  },
  'click .red.button'(event, instance) {
    event.preventDefault();
    const name = $('.iname').val();
    const leaders = $('.ileaders').val().split(',');
    const bio = $('.itext').val();
    const tags = ['fake1', 'fake2', 'fake3'];
    const pictures = ["http://shrmuhm.com/wp-content/uploads/2012/07/TheSHRMAloha_Logo-300x300.jpg", "/images/vietnamese_student_organization_officers.jpg"];
    const email = $('.iemail').val();
    const facebook = $('.ifacebook').val();
    const twitter = $('.itwitter').val();
    const instagram = $('.iinstagram').val();

    console.log(bio);
    console.log(email);
    console.log(facebook);
    console.log(twitter);
    console.log(instagram);
    console.log(instance);
    console.log(instance.context);
    const newClubData = { name, leaders, bio, tags, pictures, email, facebook, instagram };
    // Clear out any old validation errors.
    //instance.context.resetValidation();
    // Invoke clean so that newClubData reflects what will be inserted.
    ClubSchema.clean(newClubData);
    // Determine validity.
    instance.context.validate(newClubData);
    if (instance.context.isValid()) {
      console.log('true');
      Clubs.define(newClubData);
      //FlowRouter.go('Home_Page');
    } else {
      console.log('false');
    }
  },/*
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },*/
  /*
  'click .red.button': function (event) {
    const files = document.getElementById('file').files;
    console.log(files);
    _.each(files, function (file) {
      Meteor.saveFile(file, file.name);
    });
    console.log('ran');
  },*/
});
