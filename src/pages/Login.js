import React from 'react'
import { useAuthSystem } from '../utils/AuthSystem'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

function Login() {

  const {login} = useAuthSystem()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Email Required'),
    password: Yup.string().required('Password is required')
  }) 

  const formik = useFormik({
    initialValues : {
      email : 'johndoe66@gmail.com',
      password : 'somePassword'
    },
    validationSchema : LoginSchema,
    onSubmit : () => {
      const {email,password} = values;
      login(email,password)
    }
  })

  const {errors,touched, values, handleSubmit, getFieldProps} = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            {...getFieldProps('email')}
            type={"email"}
            label="Email"
            id="outlined-basic"
            variant="outlined"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            {...getFieldProps('password')}
            name="password"
            type={"password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button type='submit' color="success" variant="contained">
            Login
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default Login