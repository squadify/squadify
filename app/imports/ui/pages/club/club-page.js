import { Template } from 'meteor/templating';
import { jQuery } from 'meteor/jquery';

Template.Club_Page.onCreated(function onCreated() {
});

Template.script_template.onRendered(function () {
  jQuery.$.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js');
  jQuery.$.getScript('http://cdn.jsdelivr.net/jquery.glide/1.0.6/jquery.glide.min.js');
});

Template.Club_Page.helpers({

  'right button .right-button-div'(event, instance) {
    event.preventDefault();
    jQuery.$('.dog.image')
        .transition('fade down')
    ;
  },
});
