import React from 'react';
import { TestRenderer, act, create, update } from 'react-test-renderer';
import * as Component from './index';

describe('Button Component', () => {
    // render the component
    const component = create(<Component.Element />); 

    it('Test rendering', () => {
        // make assertions on root 
        expect(component.toJSON()).toMatchSnapshot();

        // update with some different props
        act(() => {
                component.update(<Component.Element />);
        });

        // expect(container.textContent).toBe("bbb");
 
        // make assertions on root 
        expect(component.toJSON()).toMatchSnapshot();
    });

    component.unmount()
})