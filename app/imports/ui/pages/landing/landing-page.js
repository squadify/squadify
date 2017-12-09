import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { _ } from 'meteor/underscore';

Template.Landing_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
});

Template.Landing_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  clubs() {
    let club = Clubs.find({}, {fields: {bio: 1}});
    club = _.sample(Object.values(club.collection._docs._map));
    while(club.pictures.length < 1) {
      club = Clubs.find({}, {fields: {bio: 1}});
      club = _.sample(Object.values(club.collection._docs._map));
    }
    return [club];
  }
});