import React from 'react';
import RequiredMenu from './RequiredMenu';
import RestrictedMenu from './RestrictedMenu';
import TemplateMenu from './TemplateMenu';

const Content = (props) => (
  <div className="menu-content">
    {props.currentTab === 1 ? <RequiredMenu addReqs={props.addReqs} reqs={props.reqs} keywords={props.keywords}/> : null}
    {props.currentTab === 2 ? <RestrictedMenu addRestriction={props.addRestriction} restrictions={props.restrictions} keywords={props.keywords}/> : null}
    {props.currentTab === 3 ? <TemplateMenu template={props.template} templateChange={props.templateChange} /> : null}
  </div>
)

export default Content;