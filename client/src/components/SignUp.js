import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthService } from '../services/index';
import {
  Container,
  Content,
  FlexboxGrid,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  IconButton,
  FormControl,
  Icon,
  Notification
} from 'rsuite';
import './SignUp.scss';
import { loginAction } from '../store/actions';

const validationSchema = Yup.object().shape({
  fullname: Yup.string('Fullname')
    .required('This field cannot be empty!')
    .min(3, 'Fullname must have minimum 3 characters long!')
    .max(30, 'Fullname must have maximum 30 characters long!'),
  email: Yup.string()
    .required('This field cannot be empty!')
    .email('Please enter a valid email!'),
  password: Yup.string()
    .required('This field cannot be empty!')
    .min(6, 'Password must have minimum 6 characters long!')
    .max(30, 'Password must have maximum 30 characters long!')
});

export default function SignUp({ history }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm
  } = useFormik({
    initialValues: {
    fullname: '',
      email: '',
      password: ''
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await AuthService.signUp(values);
        dispatch(loginAction(res.data));
        showNotification('success', 'You have been registered successfully.');
        localStorage.setItem('token', res.data.token);
        setSubmitting(false);
        resetForm();
        history.push('/');
      } catch (err) {
        showNotification('error', 'This user is already exists!');
        setSubmitting(false);
      }
    }
  });

  const showNotification = (type, message) => {
    Notification[type]({
      title: type,
      description: <div>{message}</div>
    });
  };

  return (
    <div className="signup-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Sign up</h3>} bordered>
                <Form fluid>
                  <FormGroup>
                    <ControlLabel>Full name</ControlLabel>
                    <FormControl
                      onChange={(_, event) => handleChange(event)}
                      placeholder="Full name"
                      name="fullname"
                      type="text"
                      errorPlacement="topEnd"
                      errorMessage={errors.fullname}
                      value={values.fullname}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Email address</ControlLabel>
                    <FormControl
                      onChange={(_, value) => handleChange(value)}
                      placeholder="Email"
                      name="email"
                      type="text"
                      errorPlacement="topEnd"
                      errorMessage={errors.email}
                      value={values.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      onChange={(_, value) => handleChange(value)}
                      placeholder="Password"
                      name="password"
                      type="password"
                      errorPlacement="topEnd"
                      errorMessage={errors.password}
                      value={values.password}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ButtonToolbar>
                      <IconButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        onClick={handleSubmit}
                        icon={<Icon icon="save" />}
                      >
                        Sign up
                      </IconButton>
                    </ButtonToolbar>
                  </FormGroup>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
