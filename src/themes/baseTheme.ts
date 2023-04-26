import { createTheme } from '@mui/material/styles';
import CousineTtf from '../fonts/Cousine-Regular.ttf';

const greenDark = '#3e6465';
const greenLight = '#a6bdbd';
const cyan = '#9fe8df';
const fontWeight = 600;

const baseTheme = {
  breakpoints: {
    values: {
      ...createTheme().breakpoints.values,
      xs: 360
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Cousine'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Cousine',
          src: `url(${CousineTtf}) format('truetype')`
        },
        'p, h1, h2, h3, h4, h5, h6': {
          margin: 0
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          borderColor: 'transparent',
          backgroundColor: '#f3f8fb',
          '&:hover': {
            '& .MuiOutlinedInput': {
              '&-notchedOutline': {
                borderColor: 'transparent'
              }
            }
          },
          '&:focus-within': {
            '& .MuiOutlinedInput': {
              '&-notchedOutline': {
                border: '2px solid #59a69c'
              }
            }
          },
          '&.Mui-error': {
            '& .MuiOutlinedInput': {
              '&-notchedOutline': {
                border: '2px solid #c09281',
                legend: {
                  width: 0
                }
              }
            },
          },
        },
        input: {
          padding: '5px 5px 4px 0',
          'text-align': 'right',    // `textAlign` isn't in the props
          color: greenDark,
          fontWeight: fontWeight,
          '&::placeholder': {
            color: greenLight,
            opacity: 1
          },
        },
        notchedOutline: {
          borderColor: 'transparent'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '-12px',
          left: '-14px',
          color: '#687a7c',
          fontSize: '17px',
          lineHeight: 1,
          '&.Mui-focused': {
            color: '#687a7c'
          }
        },
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiTypography-body1': {
            color: greenLight
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: greenDark,
          borderRadius: '5px',
          fontFamily: 'Cousine',
          color: '#fff',
          fontWeight: fontWeight,
          disableRipple: true,
          '+ .MuiChip-root': {
            marginLeft: '2%'
          },
          '&:hover': {
            backgroundColor: cyan,
            color: greenDark
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: greenLight
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#27c3ae',
          borderRadius: '5px',
          color: greenDark,
          fontWeight: fontWeight,
          '&:hover': {
            backgroundColor: cyan
          }
        }
      }
    }
  }
};

export default baseTheme;
