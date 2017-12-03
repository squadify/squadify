import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';

Template.List_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
});

Template.List_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  clubs() {
    return Clubs.find({}, { sort: { name: 1 } });
  },
  tags() {
    return Tags.find({}, { sort: { name: 1 } });
  }
});
