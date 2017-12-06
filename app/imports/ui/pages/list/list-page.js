import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { _ } from 'meteor/underscore';

Template.List_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
});
let clublist = Clubs.find({}, { sort: { name: 1 } });

Template.List_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */

  clubs() {
    //filter();
    return clublist;
  },
  tags() {
    return Tags.find({}, { sort: { name: 1 } });
  },
  filter() {
    clublist = Clubs.find({}, { sort: { name: 1 } });
    clublist = Object.values(clublist.collection._docs._map);
    clublist = _.filter(clublist, function (club) {
      return _.find(club.tags, function (tag) {
        return tag == 'Arts'
      });
    });
    return clublist;
  }
  });

Template.List_Page.events({
  '.click .tag'(event) {
    clublist = Clubs.find({}, { sort: { name: 1 } });
    clublist = Object.values(clublist.collection._docs._map);
    clublist = _.filter(clublist, function (club) {
      return _.find(club.tags, function (tag) {
        return tag == event
      });
    });
    return clublist;
  }
})
