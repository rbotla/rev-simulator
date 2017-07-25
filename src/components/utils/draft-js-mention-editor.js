import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import { fromJS } from 'immutable';
import editorStyles from './_draft-js-mention-editor.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;
const plugins = [mentionPlugin];

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.white,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.white
  },
  appBar: {
    height: 60,
  }
});

export default class DraftJSMentionEditor extends Component {
  url = this.props.url || 'employees/filter?name=';
  state = {
    editorState: EditorState.createEmpty(),
    suggestions: fromJS([]),
    mentions: []
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSearchChange = ({ value }) => {
    require('whatwg-fetch'); // eslint-disable-line global-require

    if (value.length < 3) return; // Enter minimum three chars

    fetch(this.url+value)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          suggestions: fromJS(data.map(x => ({id: x.id, name: x.name, avatar: x.url}))),
        });
      });
  };

  onAddMention = (newMention) => {
    console.log(newMention);
    // this.state.mentions.push(newMention);
  }

  handleSubmit = () => {
    const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
    // convert the raw state back to a useable ContentState object
    //const contentState = convertFromRaw( JSON.parse( rawDraftContentState) );
    console.log(convertToRaw());
  }

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
          onAddMention={this.onAddMention}
        />
        <MuiThemeProvider muiTheme={muiTheme} >
          <FlatButton label="Submit" primary={true} onTouchTap={this.handleSubmit}/>
        </MuiThemeProvider>        
      </div>
    );
  }
}
