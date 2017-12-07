import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.List_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  this.state = new ReactiveDict();
  this.state.set('tag', 'none');
});
let clublist = Clubs.find({}, { sort: { name: 1 } });

Template.List_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */

  clubs() {
    let clublist = Clubs.findAll();
    const instance = Template.instance();

    if (instance.state.get('tag') !== 'none') {
      let tag = instance.state.get('tag');
      clublist = _.filter(clublist, function (club) {
        return _.contains(club.tags, tag);
      });
      console.log(clublist);
      return clublist;
    }
    return clublist;
  },
  tags() {
    return Tags.find({}, { sort: { name: 1 } });
  },
});

Template.List_Page.events({
  'click .tag'(event, instance) {
    instance.state.set('tag', $(event.target).text());
  },
});

