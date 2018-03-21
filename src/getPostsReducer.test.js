/*
import appReducer from './appReducer';
import expect from 'expect';

const initialState = {
  topicsByUrl: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false,
};

describe('store/topics/reducer', () => {

  it('should have initial state', () => {
    expect(appReducer).toEqual(initialState);
  });
  
});
*/
import assert from 'assert';

import {appReducer} from './appReducer'; 

describe("App Reducer", () => {
	describe('LogOut()', () => {
		it('it should have null now', () => {
			
			const state = {
				Current: "someone"
			};
			const action = {
				type: 'LogOut',
				
			};
			const expected = {
				Current: null
			};
			assert.deepEqual(appReducer(state, action), expected);
		});
	});
	describe('declineInvitation()', () => {
		it('it should erase one invitation', () => {
			
			const state = {
				Invitation: [{
					From: "A",
					To: "Rick"
				}]
			};
			const action = {
				type: 'declineInvitation',
				from: "A",
				to: "Rick"
			};
			const expected = {
				Invitation: []
			};
			assert.deepEqual(appReducer(state, action), expected);
		});
	});

	describe('SignUps()', () => {
		it('it should have new account', () => {
			
			const state = {
				UserData: []
			};
			const action = {
				type: 'SignUps',
				newObject: {
					id: "newAccount",
					pw: "1234"
				}
				
			};
			const expected = {
				UserData: [{
					id: "newAccount",
					pw: "1234"
				}]
			};
			assert.deepEqual(appReducer(state, action), expected);
		});
	});
});