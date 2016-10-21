const aceEditor = {
  initializeConfig: function (id) {
    let editor = window.ace.edit(id);
    editor.getSession().setMode('ace/mode/javascript');
  },

  getVal: function (id) {
    let editor = window.ace.edit(id);
    return editor.getValue();
  },

  retrieveTemplate: function (value) {
    let editor = window.ace.edit('template');
    editor.setValue(value);
  }
};

export default aceEditor;