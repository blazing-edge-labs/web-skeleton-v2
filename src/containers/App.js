import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { logoutAction } from '../actions/auth';

@connect()
@withRouter
export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();
    const { dispatch, router } = this.props;
    dispatch(logoutAction(router));
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <nav>
          <Link to="/profile">Profile</Link>
          <a href onClick={this.onLogout}>Logout</a>
        </nav>
        <main>{children}</main>
      </div>
    );
  }
}
