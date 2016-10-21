import React from 'react';

const Tabs = (props) => (
  <li className={ props.id === props.currentTab ? 'selected tab-title' : 'tab-title'} onClick={props.changeTab}>
    {props.title}
  </li>
);

export default Tabs;