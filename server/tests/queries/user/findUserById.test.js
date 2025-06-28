import sinon from 'sinon';
import { expect } from 'chai';
import UserModel from '~/resolvers/models/UserModel';
import VotesModel from '~/resolvers/models/VoteModel';
import * as utils from '~/resolvers/utils';
import { findUserById } from '~/resolvers/queries/user';

const userId = '59b003750e3766041440171f';

const userData = {
  _id: userId,
  _followersId: [
    '5a8021eaf0b7f71bc8c6dbdc',
    '59b006a2dba5fb0027f48c76',
  ],
  _followingId: [
    '5aa672afb880071ad072dc93',
    '5a8021eaf0b7f71bc8c6dbdc',
    '59b006a2dba5fb0027f48c76',
    '5a8c813dd611e3395d65db3d',
  ],
};


describe('Queries > user > findUserById', () => {
  let usersModelStub;
  let votesModelStub;
  let utisStub;

  beforeEach(() => {
    usersModelStub = sinon.stub(UserModel, 'findOne');
    votesModelStub = sinon.stub(VotesModel, 'find');
    utisStub = sinon.stub(utils, 'uniqueArrayObjects');
  });

  afterEach(() => {
    usersModelStub.restore();
    votesModelStub.restore();
    utisStub.restore();
  });

  it('should find the user by ID', async () => {
    usersModelStub.resolves(userData);
    votesModelStub.resolves([{ _id: 1 }, { _id: 2 }]);
    const result = await findUserById()(undefined, { user_id: userId }, undefined);
    expect(userData).is.equal(result);
    sinon.assert.called(usersModelStub);
    sinon.assert.called(votesModelStub);
  });
});
