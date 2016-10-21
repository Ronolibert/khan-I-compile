import esprima from 'esprima';
import { walk } from 'esprima-walk';

const esp = {
  isPassing: function (config, code, option) {
    let copy = {...config};
    const tokens = esprima.tokenize(code);
    if (option === 'required') {
      for (let req in copy) {
        if (copy[req]) {
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].value === req) {
              copy[req] = false;
            } else if (req === 'else if' && tokens[i].value === 'else' && tokens[i + 1].value === 'if') {
              copy[req] = false;
            } else if (req === 'variable declaration') {
              walk(esprima.parse(code), function (node) {
                if (node.type === 'VariableDeclaration') {
                  node.declarations.forEach(function (declaration) {
                    if (declaration.init !== null) {
                      copy[req] = false;
                    }
                  })
                }
              })
            }
          }
        }
      }
      copy[undefined] = false;
      if (this.allFalse(copy)) {
        return true;
      } else {
        return false;
      }
    } else if (option === 'restricted') {
      return this.restrictionsSatisfied(copy, tokens);
    }
  },
  restrictionsSatisfied: function (config, tokenArray) {
    let copy = {...config}
    for (let i = 0; i < tokenArray.length; i++) {
      for (let restriction in copy) {
        if (copy[restriction] && tokenArray[i].value === restriction) {
          return false;
        } else if (copy[restriction] && restriction === 'else if' && tokenArray[i].value === 'else' && tokenArray[i + 1] === 'if') {
          return false;
        }
      }
    }
    return true;
  },
  allFalse: function (obj) {
    for (let prop in obj) {
      if (obj[prop]) {
        return false;
      }
    }
    return true;
  },
  makeTemplate: function (code, keywords) {
    this.getKeywords(code)
  },
  getKeywords: function (code) {
    const tree = esprima.parse(code);
    const keywords = ['ForStatement', 'IfStatement', 'WhileStatement']
    let keys = [];
    walk(tree, function (node) {
      if (keywords.indexOf(node.type) > -1) {
        keys.push(node.type);
      } else if (node.type === 'VariableDeclarator') {
        keys.push(node.id.name);
      }
    })
    return keys;
  },
  compare: function (editor, template) {
    let userCode = this.getKeywords(editor);
    let tempCode = this.getKeywords(template);
    let userCodeCount = this.keywordCount(userCode);
    let tempCodeCount = this.keywordCount(tempCode);
    for (let val in tempCodeCount) {
      if (userCodeCount[val] === undefined || userCodeCount[val] < tempCodeCount[val]) {
        return false;
      }
    }
    return true;
  },
  keywordCount: function (arr) {
    let obj = {};
    arr.forEach(function (val) {
      if (!obj[val]) {
        obj[val] = 1;
      } else {
        obj[val]++;
      }
    })

    return obj;
  }
}

export default esp;