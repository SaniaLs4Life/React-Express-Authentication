import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import './Form.scss';
import { loginAction } from '../store/actions';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field cannot be empty!')
    .email('Please enter a valid email!'),
  password: Yup.string()
    .required('This field cannot be empty!')
    .min(6, 'Password must have minimum 6 characters long!')
    .max(30, 'Password must have maximum 30 characters long!')
});

export default function SignIn({ history }) {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) history.push('/');
  }, [token]);
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
        const res = await AuthService.signIn(values);
        dispatch(loginAction(res.data));
        showNotification('success', 'You have been logged in successfully.');
        localStorage.setItem('token', res.data.token);
        setSubmitting(false);
        resetForm();
        history.push('/');
      } catch (err) {
        showNotification('error', 'This user is not found!');
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
    <div className="form-container">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Sign in</h3>} bordered>
                <Form fluid>
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
                        icon={<Icon icon="sign-in" />}
                      >
                        Sign in
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
