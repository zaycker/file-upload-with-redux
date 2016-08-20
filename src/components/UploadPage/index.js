import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Content, Textfield, IconButton, Button, Spinner, Snackbar } from 'react-mdl';
import './style.css';

const UploadPage = ({ data, actions }) => (
  <Content
    component="form"
    onSubmit={actions.upload}
  >
    <div
      className="upload__file-field"
    >
      <Textfield
        label="File"
        value={data.filename}
        readOnly={true}
      />
      <IconButton
        name="file_upload"
        colored={true}
        ripple={true}
        className="mdl-button--fab mdl-button--mini-fab"
      />
      <input
        type="file"
        name="file"
        onChange={e => actions.fileSelected(e.target.value)}
        className="upload__attach-file-input"
      />
    </div>
    {
      data.progress ? (
        <div className="upload__submit-spinner"><Spinner /></div>
      ) : (
        <Button
          raised={true}
          colored={true}
          className="upload__submit-button"
          type="submit"
        >Upload</Button>
      )
    }
    <Snackbar
      active={!!data.message}
      onTimeout={actions.changeMessage}
    >
      {data.message}
    </Snackbar>
  </Content>
);

const mapStateToProps = (data) => ({ data });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
