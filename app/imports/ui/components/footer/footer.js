import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.page_footer.events({
  'keypress .prompt': function (event) {
    if (event.which == 13) {
      let input = $('.prompt.footer').val();
      if (input) {
        location.href = FlowRouter.path("/search/:parameters", { parameters: input });
      }
    }
  }
});