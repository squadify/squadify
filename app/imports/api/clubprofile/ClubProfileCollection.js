import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Club */

/**
 * Clubs provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ClubProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Club', new SimpleSchema({
      // Remainder are optional
      name: { type: String, optional: true },
      leaders: { type: Array, optional: true },
      'leaders.$': { type: String },
      bio: { type: String, optional: true },
      tags: { type: Array, optional: true },
      'tags.$': { type: String },
      pictures: { type: Array, optional: true },
      'pictures.$': { type: SimpleSchema.RegEx.Url },
      email: { type: SimpleSchema.RegEx.Url, optional: true },
      facebook: { type: SimpleSchema.RegEx.Url, optional: true },
      instagram: { type: SimpleSchema.RegEx.Url, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Club.
   * @example
   * Clubs.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ name = '', leaders = [], bio = '', tags = [], pictures = [], email = '', facebook = '', instagram = '' }) {
    // make sure required fields are OK.
    const checkPattern = {
      name: String, bio: String,
    };
    check({ name, bio }, checkPattern);

    // Throw an error if any of the passed Interest names are not defined.
    /*Tags.assertNames(tags);

    // Throw an error if there are duplicates in the passed interest names.
    if (tags.length !== _.uniq(tags).length) {
      throw new Meteor.Error(`${tags} contains duplicates`);
    }
*/
    return this._collection.insert({ name, leaders, bio, tags, pictures, email, facebook, instagram });
  }

  /**
   * Returns an object representing the Club docID in a format acceptable to define().
   * @param docID The docID of a Club.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const leaders = doc.leaders;
    const bio = doc.bio;
    const tags = doc.tags;
    const pictures = doc.pictures;
    const email = doc.email;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    return { name, leaders, bio, tags, pictures, email, facebook, instagram };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Clubs = new ClubProfileCollection();
