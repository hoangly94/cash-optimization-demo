import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Props} from './index';
import ChevronComponent from './chevron';

export default {
  title: 'Design System/Atoms/SVG',
  component: ChevronComponent,
};

export const Chevron: Story<Props> = (args) => <ChevronComponent {...args} />;

Chevron.args  = {
}
