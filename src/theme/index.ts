import { Theme } from 'theme-ui'

const defaultButton = {
  outline: 'none',
}

const theme: Theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  breakpoints: ['40em', '56em', '64em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.5,
  },
  sizes: {
    container: '100%',
  },
  layout: {
    section: {
      pt: [5, 5, 4],
      px: 4,
      width: '100%',
    },
  },
  buttons: {
    menu: {
      ...defaultButton,
    },
    primary: {
      ...defaultButton,
      cursor: 'pointer',
      bg: 'green',
      color: 'secondary',
      transition: 'all .1s ease-out',
      '&:hover': {
        bg: 'secondary',
        color: 'green',
      },
    },
    secondary: {
      ...defaultButton,
      bg: 'secondary',
      color: 'white',
      cursor: 'pointer',
    },
  },
  colors: {
    text: '#FFF',
    background: '#333',
    primary: '#FFF',
    gray: '#f0f0f0',
    secondary: '#333',
    green: 'rgb(99, 255, 203)',
    muted: '#999',
    code: '#444',
  },
  links: {
    text: {
      color: 'green',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    nav: {
      fontSize: [2, 2, 0],
      mr: 4,
      my: [3, 3, 2],
      color: 'primary',
      transition: 'all 0.15s ease-out',
      '&:active': {
        color: 'green',
      },
      '&:focus': {
        color: 'green',
      },
      '&:hover': {
        opacity: 0.5,
      },
    },
  },
  text: {
    heading: {
      mb: 3,
    },
    default: {
      mb: 3,
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      letterSpacing: '0.6px',
      bg: 'black',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      color: 'muted',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
      variant: 'text.heading',
    },
    h4: {
      color: 'muted',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'body',
      fontSize: 2,
      variant: 'text.heading',
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      my: 3,
      p: 3,
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'code',
      },
      maxWidth: '700px',
      borderRadius: '7px',
      bg: 'gray',
      color: 'black',
    },
    // @ts-ignore
    spinner: {
      size: 20,
      mr: 2,
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
    hr: {
      my: 4,
      bg: 'muted',
      opacity: 0.3,
      height: '1px',
    },
  },
}

export default theme
