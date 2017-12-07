import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.List_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  this.state = new ReactiveDict();

  const tags = FlowRouter.getParam('_id');
  console.log(tags);
  if (tags === undefined) {
    this.state.set('tag', 'none');
  } else {
    this.state.set('tag', tags);
  }
  // See https://dweldon.silvrback.com/guards to understand '&&' in next line.

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

