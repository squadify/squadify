import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Club_Page.onCreated(function onCreated() {
  // this.subscribe(Interests.getPublicationName());
  // this.subscribe(Profiles.getPublicationName());
  this.subscribe(Clubs.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  // this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Club_Page.helpers({
  /*
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  */

  /*
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  interests() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
        });
  },
  */
});

Template.Club_Page.events({
  'click .huge.green.button': function () {
    // console.log('apply');
    // FlowRouter.route('/');
    $('.ui.modal')
        .modal({
          blurring: true,
        })
        .modal({
          closable: true,
          onDeny: function () {
          },
          onApprove: function () {
            /*
            const name = document.registration('Name').value;
            const email = document.registration('Email').value;
            const text = document.registration('TextArea').value;
            console.log(name);
            console.log(email);
            console.log(text);
            */
          },
        })
        .modal('show')
    ;
  },
  'submit .actions'(event, instance) {
    event.preventDefault();
    console.log('submit');
    console.log(event);
    const name = event.target.Name;
    const email = event.target.Email.value;
    const text = event.target.TextArea.value;

    console.log(name);
    console.log(email);
    console.log(text);
    /*
    const title = event.target.Title.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const github = event.target.Github.value;
    const facebook = event.target.Facebook.value;
    const instagram = event.target.Instagram.value;
    const bio = event.target.Bio.value;
    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);

    const updatedProfileData = { firstName, lastName, title, picture, github, facebook, instagram, bio, interests,
      username };
    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }

  */
  },
});
