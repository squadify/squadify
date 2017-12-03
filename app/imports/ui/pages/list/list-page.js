import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

Template.List_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.List_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  clubs() {
    return Clubs.find({}, { sort: { name: 1 } });
  }
});
