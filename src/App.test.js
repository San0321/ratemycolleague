import expect from 'expect';
import React from 'react';
import {mount, shallow, configure} from 'enzyme';
//import TestUtils from 'react-addons-test-utils';
import Homepage from './Homepage';
import Profile from './Profile';
import Searched from './Searched';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Homepage />', () => {
     it('Homepage Unit Testing', () => {
    const wrapper = mount(<Homepage />);
    expect(wrapper.find('p').text()).toEqual('Our website allows you to search people who are qualified for your team-work project'); 
  });
})

describe('<Profile />', () => {
     it('Profile Unit Testing', () => {
    const wrapper = mount(<Profile />);
    const status = wrapper.state().showGroup;
    expect(status).toEqual(false);
   // expect(wrapper.find('h1').text()).toEqual('Welcome to our website!'); 
  });
}) 

describe('<Searched />', () => {
     it('Searched Unit Testing', () => {
    const wrapper1 = mount(<Searched />);
    const status2 = wrapper1.state().modal1State;
    expect(status2).toEqual('none');

   // expect(wrapper.find('p').text()).toEqual('Welcome to our website!'); 
  });  
})    
//// thsdasda
/*   
it ('renders', () => {
    const wrapper = mount(<Homepage/>);
    expect(wrapper.find('h1').text()).toEqual('Welcome to our website!');
});
*/
/*
function setup(saving) {
    const props = {
        course: {}, saving: saving, errors: {},
        onSave: () => {},
        onChange: () => {}
    };
    return shallow(<Homepage {...props}/>);

    describe('Homepage via Enzyme', () => {
        it('renders form and h1', () => {
            const wrapper = setup(false);
            expect(wrapper.find('div').length).toBe(1);
            expect(wrapper.find('h1').text()).toEqual("Welcome to our website!"); 

        })
    });
}
*/