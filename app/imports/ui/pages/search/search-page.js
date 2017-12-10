import { Template } from 'meteor/templating';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { _ } from 'meteor/underscore';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

let param;

Template.Search_Page.onCreated(function onCreated() {
  this.subscribe(Clubs.getPublicationName());
  this.subscribe(Tags.getPublicationName());
  this.state = new ReactiveDict();

  param = FlowRouter.getParam('parameters');
  this.state.set('tag', 'null');
  this.state.set('name', 'null');
  if (param !== undefined) {
    this.state.set('tag', param);
    this.state.set('name', param);
  }
  // See https://dweldon.silvrback.com/guards to understand '&&' in next line.

});

Template.Search_Page.helpers({
  /**
   * Returns a cursor to profiles, sorted by last name.
   */

  clubs() {
    let clublist = Clubs.findAll();
    const instance = Template.instance();
    let tag = instance.state.get('tag');
    let name = instance.state.get('name');
    if(!tag) {
      tag = 'null';
    }
    if (param !== undefined || tag === 'null') {
      console.log(name);
      console.log(tag);
      clublist = _.filter(clublist, function (club) {
        return (_.some(club.tags, function(tagg){return tagg.toLowerCase().includes(tag.toLowerCase());}) || ((club.name).toLowerCase()).includes(name.toLowerCase()));
      });
    } else {
      console.log("Here");
      clublist = _.filter(clublist, function (club) {
        return (_.contains(club.tags, tag) && ((club.name).toLowerCase()).includes(name.toLowerCase()));
      });
    }
    return clublist;
  },

  tags() {
    return Tags.find({}, { sort: { name: 1 } });
  }
});

Template.Search_Page.events({
  'click .search.button'() {
    const instance = Template.instance();
    instance.state.set('name', $('.clubname').val());
    instance.state.set('tag', $('.tag.dropdown').dropdown('get value'));
    param = undefined;
  }
});