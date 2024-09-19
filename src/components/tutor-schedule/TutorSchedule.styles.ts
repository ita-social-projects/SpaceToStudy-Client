export const styles = {
  general_container: {
    width: '500px',
    height: '500px'
  },

  section_title: {
    typography: 'h5',
    color: 'basic.lightBlue',
    ml: '45px'
  },

  section_subtitle: {
    typography: 'subtitle1',
    color: 'basic.blueGray',
    ml: '45px'
  },

  card_container: {
    display: 'flex',
    width: '500px',
    height: '97px',
    backgroundColor: '#ffff',
    borderRadius: '16px',
    boxShadow: `0px 9px 12px 1px #90A4AE24, 
    0px 3px 16px 2px #90A4AE1F, 
    0px 5px 6px -3px #90A4AE33`
  },

  card_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px',
    mt: '25px'
  },

  main_info_container: {
    display: 'flex',
    flexDirection: 'column',
    ml: '9px'
  },

  avatar: {
    m: '11px 0px 11px 13px',
    width: '75px',
    height: '75px'
  },

  time: {
    color: 'basic.blueGray',
    mt: '11px',
    typography: 'subtitile2'
  },

  price_and_message: {
    display: 'flex',
    flexDirection: 'column',
    m: '7px 20px 0px auto',
    alignItems: 'flex-end',
    gap: '20px',
    '& p': {
      typography: 'h6',
      color: 'basic.lightBlue',
      '& span': {
        typography: 'subtitle1',
        color: '#basic.grey'
      }
    }
  },

  subject: {
    typography: 'body2',
    color: 'basic.lightBlue'
  },

  btn: {
    color: 'basic.darkGrey',
    typography: 'body1',
    textDecoration: 'underline',
    display: 'block',
    m: 'auto',
    mt: '35px'
  },

  user_name: {
    typography: 'h6',
    color: 'basic.lightBlue'
  }
}
