import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';
import { Tags } from '/imports/api/tags/InterestsCollection';
import { Admin } from '/imports/api/admin/AdminCollection';

Interests.publish();
Profiles.publish();
Clubs.publish();
Tags.publish();
Admin.publish();
