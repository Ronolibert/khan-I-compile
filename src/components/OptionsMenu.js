import React, { Component } from 'react';
import Tabs from './Tabs';
import Content from './Content';

class OptionsMenu extends Component {

  clickEvent (tab) {
    this.props.changeTab(tab);
  }

  render () {
    return (
      <div className="options-menu">
        <div className="header">
          <h2 className="heading">Options</h2>
        </div>
        <ul className="options-list">
        {this.props.menuTabs.map(tab => <Tabs title={tab.title} key={tab.id} id={tab.id}
                                              currentTab={this.props.currentTab}
                                              changeTab={this.clickEvent.bind(this, tab)} />)}
        </ul>
        <Content currentTab={this.props.currentTab}
                 addReqs={this.props.addReqs}
                 addRestriction={this.props.addRestriction}
                 reqs={this.props.reqs}
                 restrictions={this.props.restrictions}
                 keywords={this.props.keywords}
                 template={this.props.template}
                 templateChange={this.props.templateChange}/>
        {this.props.currentTab === 3 ? <button className="submit-btn" onClick={this.props.submitTemplate}>Submit</button> : null}
        {this.props.currentTab === 3 ? <button className="template-btn" onClick={this.props.showExample}> Example Template </button> : null}
      </div>
    )
  }
}

export default OptionsMenu;