import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Calendar from '../components/Calendar';

storiesOf('Calendar', module)
  .add('Basic Usage - Date Selector', () => (
    <Calendar />
  ))
  .add('Basic Usage - Month Selector', () => (
    <Calendar type="month" />
  ))
  .add('Basic Usage - Year Selector', () => (
    <Calendar type="year" />
  ))
  .add('Range Selector', () => (
    <Calendar range />
  ));
