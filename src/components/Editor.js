import React, { Component } from 'react';
import OptionsMenu from './OptionsMenu';
import Configuration from './Configuration';
import aceEditor from '../helpers/aceEditor';

class Editor extends Component {
    componentDidMount () {
      aceEditor.initializeConfig('editor');
      this.props.checkStatus();
    }

    render () {
        return (
            <div className="container">
              <Configuration reqs={this.props.reqs} restrictions={this.props.restrictions}/>
              <div id="editor" onInput={this.props.editorChange}>
              </div>
              <OptionsMenu menuTabs={this.props.menuTabs}
                           currentTab={this.props.currentTab}
                           changeTab={this.props.changeTab}
                           addReqs={this.props.addReqs}
                           addRestriction={this.props.addRestriction}
                           reqs={this.props.reqs}
                           restrictions={this.props.restrictions}
                           keywords={this.props.keywords}
                           template={this.props.template}
                           templateChange={this.props.templateChange}
                           showExample={this.props.showExample}/>
            </div>
        );
    }
};

export default Editor;
