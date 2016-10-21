import React, { Component } from 'react';
import Editor from './Editor';
import '../../css/App.css';
import aceEditor from '../helpers/aceEditor';
import esp from '../helpers/esprimaHelpers';

class App extends Component {
  constructor () {
    super();
    this.state = {
      menuTabs: [{ title: 'Required', id: 1}, { title: 'Restricted', id: 2}, { title: 'Template', id: 3}],
      currentTab: 1,
      requiredItems: {},
      restrictions: {},
      keywords: ['if', 'else if', 'else', 'for', 'while', 'variable declaration'],
      vars: [],
      editor: '',
      template: '',
      example: 'for (_;_;_) {\n  if (_) {\n    console.log("template base");\n  }\n}',
      passing: true
    };
  }

  changeTab (tab) {
    this.setState({
      currentTab: tab.id
    })
  }

  addReqs (event) {
    let value = event.target.value;
    let obj = {};
    obj[value] = !this.state.requiredItems[value]
    this.setState({
      requiredItems: {...this.state.requiredItems, ...obj}
    }, function () { this.editorChange() });
  }

  addRestriction (event) {
    let value = event.target.value;
    let obj = {};
    obj[value] = !this.state.restrictions[value];
    this.setState({
      restrictions: {...this.state.restrictions, ...obj}
    }, function () { this.editorChange() });
  }

  editorChange (event) {
    this.setState({ editor: aceEditor.getVal('editor') }, function () {
      let requirements = this.state.requiredItems;
      let restrictions = this.state.restrictions;
      let code = this.state.editor;
      let passRestrictions = esp.isPassing(restrictions, code, 'restricted');
      let passReqs = esp.isPassing(requirements, code, 'required');
      let templatePassing = esp.compare(this.state.editor, this.state.template);
      if (passReqs && passRestrictions && templatePassing) {
        this.setState({passing: true});
      } else {
        this.setState({passing: false});
      }
    });
  }

  templateChange (event) {
    this.setState({template: aceEditor.getVal('template')});
  }

  submitTemplate () {
    this.setState({template: aceEditor.getVal('template')} , function () {
      if (esp.compare(this.state.editor, this.state.template)) {
        this.setState({passing: true});
      } else {
        this.setState({passing: false});
      }
    })
  }

  checkStatus () {
    const self = this;
    setInterval(function () {
      self.editorChange();
    }, 1500)
  }

  exampleTemplate () {
    aceEditor.retrieveTemplate(this.state.example);
    this.templateChange();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="logo">Khan I Compile { this.state.passing ?
                                                <span className="checkmark">
                                                    <div className="checkmark_circle"></div>
                                                    <div className="checkmark_stem"></div>
                                                    <div className="checkmark_kick"></div>
                                                </span> :
                                                <span className="x-mark">X</span>
                                              }</h1>
        </div>
        <Editor menuTabs={this.state.menuTabs}
                currentTab={this.state.currentTab}
                changeTab={this.changeTab.bind(this)}
                addReqs={this.addReqs.bind(this)}
                addRestriction={this.addRestriction.bind(this)}
                reqs={this.state.requiredItems}
                restrictions={this.state.restrictions}
                keywords={this.state.keywords}
                editorChange={this.editorChange.bind(this)}
                template={this.state.template}
                templateChange={this.templateChange.bind(this)}
                checkStatus={this.checkStatus.bind(this)}
                showExample={this.exampleTemplate.bind(this)} />
      </div>
    );
  }
}

export default App;
