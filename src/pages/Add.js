import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useData } from '../utils/DataProvider';
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';


function Add() {

  const navigate = useNavigate()

  const {dispatch} = useData()

  const AddSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    username: Yup.string().required('Username is required'),
    email : Yup.string().email().required('Email is Required'),
  }) 

  const formik = useFormik({
    initialValues : {
      name : '',
      username : '',
      email : ''
    },
    validationSchema : AddSchema,
    onSubmit : () => {
      const {name,username,email} = values;
      dispatch({type:'ADD_USER',payload:{
        id : uuidv4(),
        name :name,
        username : username,
        email : email
      }})
      navigate('/')
    }
  })


  const {errors,touched, values, handleSubmit, getFieldProps} = formik;


  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type={"text"}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            {...getFieldProps("name")}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            type={"text"}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />
          <TextField
            type={"email"}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <Button type='submit' color="success" variant="contained">
            Add User
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default Add