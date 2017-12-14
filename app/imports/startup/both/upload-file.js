import { FS } from 'meteor/cfs:base-package';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

const Images = new FS.Collection('images', {
  stores: [new FS.Store.FileSystem('images', { path: '/public/images' })],
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    console.log('works');
    return true;
  },
});