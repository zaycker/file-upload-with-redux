import React from 'react';
import { DOWNLOAD_URL } from '../../constants/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Content, List, ListItem } from 'react-mdl';

const ListPage = ({ data, actions }) => (
  <Content>
    <List>
      {
        data.list.map(({ fileName, key }, index) => (
          <ListItem key={index}>
            <a href={`${DOWNLOAD_URL + key}`}>{fileName}</a>
          </ListItem>
        ))
      }
    </List>
  </Content>
);

const mapStateToProps = (data) => ({ data });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(ListPage);