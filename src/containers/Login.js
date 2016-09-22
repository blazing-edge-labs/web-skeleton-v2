import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Link, withRouter } from 'react-router';
import { loginFetch } from '../actions/auth';
import { isEmail, isPassword, isRequired } from '../utils/validator';
import Input from '../components/Input';

const validate = ({ email, password }) => {
  const errors = {};

  errors.email = isRequired(email) || isEmail(email);
  errors.password = isRequired(password) || isPassword(password);
  return errors;
};

@connect()
@withRouter
@reduxForm({
  form: 'Login',
  validate,
})
export default class Login extends Component {
  static propTypes = {
    ...propTypes,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(values) {
    const { dispatch, router } = this.props;
    return dispatch(loginFetch(values, router));
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;

    return (
      <article>
        <form onSubmit={handleSubmit(this.onLogin)} noValidate>
          <Field
            name="email"
            component={Input}
            label="Email"
            type="email"
            placeholder="Email"
          />
          <Field
            name="password"
            component={Input}
            label="Password"
            type="password"
            placeholder="Password"
          />
          {error && <p>{error}</p>}
          <button type="submit" disabled={submitting}>Login</button>
        </form>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <Link to="/signup">Sign up here</Link>
      </article>
    );
  }
}
