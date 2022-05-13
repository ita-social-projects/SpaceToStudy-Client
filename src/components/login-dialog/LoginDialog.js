import { useState } from 'react'
import { endAdornment } from '~/services/eyeToggle'
import { Box, FormControl, FormControlLabel, Typography, TextField, Button, Checkbox } from '@mui/material'

import login from '~/assets/login.svg'

const style = {
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h2: { 
    marginBottom: '32px',
    fontSize: '40px', 
    lineHeight: '48px' 
  },
  checkboxContainer: {
    margin: '25px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  linesBox: {
    margin: '23px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    display: 'flex',
    width: '34%', 
    height: '2px', 
    backgroundColor: 'primary.100'
  },
  google: {
    marginBottom: '16px',
    width: '100%'   
  },
  underlineText: {
    fontWeight: '500',
    textDecoration: 'underline',
  }
}

const LoginDialog = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setrememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  
  const emailHandler = ( event ) => {
    setEmail( event.target.value )
  }
  const passwordHandler = ( event ) => {
    setPassword( event.target.value )
  }
  const rememberMeHandler = ( ) => {
    setrememberMe( !rememberMe )
  }
  
  
  const submitHandler = (event) => {
    event.preventDefault()

    console.log( {
      email: email,
      password: password,
      rememberMe: rememberMe
    } )
    setEmail('')
    setPassword('')
    setrememberMe(false)
  }


  return (
    <Box sx={ style.form }>
      <Box sx={ { display: { xs: 'none', sm: 'none', md: 'inherit' } } }>
        <img alt="login" src={ login } />
      </Box> 
      
      <form onSubmit={ submitHandler }>
        { /* <FormControl onSubmit={ submitHandler } sx={ { m: '0', width: '370px' } }> */ }
        <Typography sx={ style.h2 } variant="h2">Welcome back</Typography>
        
        <TextField
          fullWidth 
          label='Email'
          onChange={ emailHandler }
          required
          size='large'
          sx={ { mb: '16px' } }
          type='email'
          value={ email }
        ></TextField>
        <TextField 
          InputProps={ endAdornment( showPassword, setShowPassword ) }
          fullWidth
          label='Password' 
          onChange={ passwordHandler }
          required
          type='password'
          value={ password }
        ></TextField>
        
        <Box sx={ style.checkboxContainer } >
          <FormControlLabel
            checked={ rememberMe }
            control={ <Checkbox /> }
            label='Remember me'
            labelPlacement='end'
            onChange={ rememberMeHandler }
            sx={ { color: 'primary.900', fontSize:'24px' } }
            value={ rememberMe }
          />
          <Typography sx={ style.underlineText } variant='subtitle2'>Forgot Password?</Typography>
        </Box>
        
        <Button
          size='large' sx={ { width: '100%' } } type='submit'
          variant="contained"
        >
          LOGIN
        </Button>
        
        <Box sx={ style.linesBox }>
          <Box sx={ style.line } />
          <Typography variant="overline">or continue</Typography>
          <Box sx={ style.line } />
        </Box>
        
        <Button size='large' sx={ style.google } variant="outlined">GOOGLE</Button>
        
        <Box sx={ { display: 'flex' } }>
          <Typography sx={ { pr: 1 } } variant="body2">
            Don’t have an account yet?
          </Typography>
          <Typography sx={ style.underlineText } variant="body2">Join us for free</Typography>
        </Box>
        { /* </FormControl> */ }
      </form>
    </Box>
  )
}

export default LoginDialog
