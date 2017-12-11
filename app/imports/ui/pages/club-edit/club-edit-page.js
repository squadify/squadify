import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const ClubSchema = new SimpleSchema({
  // Remainder are optional
  bio: { type: String, optional: true },
  pictures: { type: Array, optional: true },
  'pictures.$': { type: SimpleSchema.RegEx.Url },
  email: { type: SimpleSchema.RegEx.Url, optional: true },
  facebook: { type: SimpleSchema.RegEx.Url, optional: true },
  instagram: { type: SimpleSchema.RegEx.Url, optional: true },
  twitter: { type: SimpleSchema.RegEx.Url, optional: true },
});

let id;

Template.Club_Edit_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  //id = FlowRouter.getParam('_id');
  id = 's3fbF9q6kwkWji2xE';
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
});

Template.Club_Edit_Page.events({
  'click .green.button'(event, instance) {
    event.preventDefault();
    console.log('green button');
    const bio = $('.itext').val();
    const pictures = ["http://shrmuhm.com/wp-content/uploads/2012/07/TheSHRMAloha_Logo-300x300.jpg", "/images/vietnamese_student_organization_officers.jpg"];
    const email = $('.iemail').val();
    const facebook = $('.ifacebook').val();
    const instagram = $('.iinstagram').val();
    const twitter = $('.itwitter').val();

    console.log(bio);
    console.log(email);
    console.log(facebook);
    console.log(twitter);
    console.log(instagram);
    console.log(instance);
    console.log(instance.context);
    const newClubData = { bio, pictures, email, facebook, instagram, twitter };
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
            'bio': newClubData.bio,
            'email': newClubData.email,
            'facebook': newClubData.facebook,
            'instagram': newClubData.instagram,
            'twitter': newClubData.twitter,
          },
          $push: { 'pictures': { $each: newClubData.pictures } },
        });

      //Contacts.insert(newClubData);
      //FlowRouter.go('Home_Page');
    } else {
      console.log('false');
    }
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
