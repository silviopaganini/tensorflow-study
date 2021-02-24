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
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 2,
  },
  sizes: {
    container: '100%',
  },
  layout: {
    section: {
      p: 4,
      width: '100%',
    },
  },
  buttons: {
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
    secondary: '#333',
    green: 'rgb(99, 255, 203)',
    muted: '#999',
  },
  links: {
    text: {
      color: 'green',
    },
    nav: {
      fontSize: 0,
      mr: 4,
      my: 2,
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
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
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
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
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
  },
}

export default theme
