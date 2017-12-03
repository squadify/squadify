import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Clubs } from '/imports/api/clubprofile/ClubProfileCollection';

Interests.publish();
Profiles.publish();
Clubs.publish();
