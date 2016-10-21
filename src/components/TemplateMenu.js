import React, { Component } from 'react';
import aceEditor from '../helpers/aceEditor';

class TemplateMenu extends Component {
  componentDidMount () {
    aceEditor.initializeConfig('template');
    aceEditor.retrieveTemplate(this.props.template);
  }

  render () {
    return (
      <div id="template" onInput={this.props.templateChange}>
      </div>
    );
  }
}

export default TemplateMenu;