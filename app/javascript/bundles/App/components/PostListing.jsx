import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import PostRow from './PostRow';
import $ from 'jquery';

export default class PostListing extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  constructor (props, railsContext) {
    super(props)
    this.state = {
      page: 0,
      eof: false,
      posts: []
    }
  }

  fetchPosts = () => {
    var queryParam = location.search.split('q=')[1];

    $.ajax({
      method: 'GET',
      url: this.props.url,
      data: { page: this.state.page + 1, q: queryParam },
    }).done((data) => {
      if (data.length > 0) {
        this.setState((prevState, props) => {
          return {
            page: prevState.page + 1,
            posts: prevState.posts.concat(data)
          };
        });
      } else {
        this.setState({eof: true});
      }
    });
  }

  renderTable() {
    return (
      <table className="table">
        <thead>
          <tr className="thead-inverse">
            <th>Content</th>
            <th className="text-nowrap text-right">Last Update</th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map(function(post) {
            return <PostRow key={post.id} post={post} />
          })}
        </tbody>
      </table>
    );
  }

  renderWaypoint() {
    if (!this.state.eof) {
      return (
        <Waypoint onEnter={this.fetchPosts}>
          <div className="text-center">
            <i className="fa fa-spinner fa-spin fa-3x"/>
          </div>
        </Waypoint>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderTable()}
        {this.renderWaypoint()}
      </div>
    );
  }
}
