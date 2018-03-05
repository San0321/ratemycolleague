import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Homepage from './Homepage';

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