import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../../services/Context/AuthContext'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Accounting App | Farah Thesis
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Signin(props) {
  const { state, isAuthenticated, Signin } = useContext(AuthContext)
  const [value, setValue] = useState({
    email: '',
    password: ''
  })
  const { email, password } = value

  const classes = useStyles();

  const checkLogin = () => {
    if (isAuthenticated()) {
      return <Redirect to='/' />
    } else {
      return false
    }
  }

  const handleClickShowPassword = () => {
    setValue({ ...value, showPassword: !value.showPassword });
  };

  const handleChange = name => event => {
    setValue({
      ...value,
      [name]: event.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Signin({ email, password })
  }

  const showLoading = () => (
    state.loading && (
      <LinearProgress style={{ top: 27, alignItems: 'center', }} />
    )
  )

  const textButtonSubmit = () => {
    if (state.loading) {
      return state.message
    } else {
      return 'MASUK'
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {checkLogin()}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            TOKO ROTI AMAYA
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit} >
            <TextField value={email} onChange={handleChange('email')} variant="outlined" margin="normal" required fullWidth label="Email Pengguna" autoComplete="email" autoFocus />
            <FormControl className={classes.textField} margin="normal" variant="outlined" required fullWidth label="Kata Sandi">
              <InputLabel>Kata Sandi</InputLabel>
              <OutlinedInput
                autoComplete="current-password"
                type={value.showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {value.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {showLoading()}
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={state.loading}>
              {textButtonSubmit()}
            </Button>

            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://images.unsplash.com/photo-1477763858572-cda7deaa9bc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));