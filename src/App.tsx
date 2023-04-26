import React, { useState, ChangeEvent } from 'react';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import baseTheme from './themes/baseTheme';
import './App.scss';

const theme = createTheme(baseTheme);

const App = () => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState(0);
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [billError, setBillError] = useState(false);
  const [peopleNumberError, setPeopleNumberError] = useState(false);

  const handleBill = (evt: ChangeEvent<HTMLInputElement>) => {
    const numericInput = evt.target.value.replace(/[^\d.]/g, '');
    const hasDecimal = numericInput.includes('.');
    const numericString = hasDecimal
      ? `${numericInput.split('.')[0]}.${numericInput.split('.')[1].substring(0, 2)}`
      : numericInput;

    if (numericInput) {
      setBillError(false);
    }
    if (!numericString) {
      setBillError(true);
    }
    setBill(numericString);
  }

  const handleTip = (fixedTip: number) => {
    if (tip === fixedTip) {
      setTip(0);
    } else {
      setTip(fixedTip);
    }
    setCustomTip(0);
    if (!bill) {
      setBillError(true);
    }
    if (!peopleNumber) {
      setPeopleNumberError(true);
    }
  }

  const handleCustomTip = (evt: ChangeEvent<HTMLInputElement>) => {
    const customTip = parseInt(evt.target.value.replace(/\D/g, ''), 10);
    // assume tip less 100 %
    if (customTip < 100) {
      setTip(0);
      setCustomTip(customTip);
      if (!bill) {
        setBillError(true);
      }
      if (!peopleNumber) {
        setPeopleNumberError(true);
      }
    }
    if (!customTip) {
      setCustomTip(0);
    }
  };

  const handlePeopleNumber = (evt: ChangeEvent<HTMLInputElement>) => {
    const peopleNumber = parseInt(evt.target.value.replace(/\D/g, ''), 10);
    if (peopleNumber > 0) {
      setPeopleNumber(peopleNumber);
      setPeopleNumberError(false);
    }
    if (!peopleNumber) {
      setPeopleNumber(0);
      setPeopleNumberError(true);
    }
  };

  const handleReset = () => {
    setBill('');
    setTip(0);
    setCustomTip(0);
    setPeopleNumber(0);
    setBillError(false);
    setPeopleNumberError(false);
  };

  const getTipAmount = () => {
    if (peopleNumber !== 0) {
      const actualTip = tip || customTip / 100;
      const tipPerPerson = parseFloat(bill) * actualTip / peopleNumber;
      return tipPerPerson.toFixed(2);
    }
    return '0.00';
  };

  const getTotalPerPerson = () => {
    if (peopleNumber !== 0) {
      const actualTip = tip || customTip / 100;
      const totalPerPerson = parseFloat(bill) * (1 + actualTip) / peopleNumber;
      return totalPerPerson.toFixed(2);
    }
    return '0.00';
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className='App'>
          <CssBaseline />
          <Container className='main-container' fixed disableGutters>
            <div className='top-logo'>
              Spli<br />tter
            </div>
            <Box className='input-box'>
              <div className='input-wrapper'>
                <div className='label-validation'>
                  <p className='label'>Bill</p>
                  {billError && <p className='validation'>Can't be zero</p>}
                </div>
                <TextField
                  error={billError}
                  id='bill'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AttachMoneyIcon />
                      </InputAdornment>
                    )
                  }}
                  placeholder='0'
                  value={bill ? bill : ''}
                  onChange={handleBill}
                />
              </div>
              <div className='input-wrapper'>
                <div className='label-validation'>
                  <p className='label'>Select Tip %</p>
                </div>
                <div className='chips-container'>
                  <Chip
                    className={`chip-tip ${tip === 0.05 ? 'chip-tip__selected' : ''}`}
                    label='5%'
                    onClick={() => handleTip(0.05)}
                  />
                  <Chip
                    className={`chip-tip ${tip === 0.10 ? 'chip-tip__selected' : ''}`}
                    label='10%'
                    onClick={() => handleTip(0.10)}
                  />
                  <Chip
                    className={`chip-tip ${tip === 0.15 ? 'chip-tip__selected' : ''}`}
                    label='15%'
                    onClick={() => handleTip(0.15)}
                  />
                  <Chip
                    className={`chip-tip ${tip === 0.25 ? 'chip-tip__selected' : ''}`}
                    label='25%'
                    onClick={() => handleTip(0.25)}
                  />
                  <Chip
                    className={`chip-tip ${tip === 0.50 ? 'chip-tip__selected' : ''}`}
                    label='50%'
                    onClick={() => handleTip(0.50)}
                  />
                  <Input
                    className='custom-input'
                    placeholder='Custom'
                    onChange={handleCustomTip}
                    disableUnderline
                    value={customTip > 0 ? customTip : ''}
                  />
                </div>
              </div>
              <div className='input-wrapper'>
                <div className='label-validation'>
                  <p className='label'>Number of People</p>
                  {peopleNumberError && <p className='validation'>Can't be zero</p>}
                </div>
                <TextField
                  error={peopleNumberError}
                  id='people'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PersonIcon />
                      </InputAdornment>
                    )
                  }}
                  placeholder='0'
                  value={peopleNumber ? peopleNumber : ''}
                  onChange={handlePeopleNumber}
                />
              </div>
            </Box>
            <Box className='tip-values'>
              <div className='total-wrapper'>
                <div className='amount-wrapper'>
                  <div className='tip-title'>
                    <div className='amount-text'>
                      Tip Amount
                    </div>
                    <div className='amount-subtext'>
                      / person
                    </div>
                  </div>
                  <div className='values-total'>
                    <span className='currency-icon'>$</span>
                    <span className='amount-total'>{getTipAmount()}</span>
                  </div>
                </div>
                <div className='amount-wrapper'>
                  <div className='total-title'>
                    <div className='amount-text'>
                      Total
                    </div>
                    <div className='amount-subtext'>
                      / person
                    </div>
                  </div>
                  <div className='values-total'>
                    <span className='currency-icon'>$</span>
                    <span className='amount-total'>{getTotalPerPerson()}</span>
                  </div>
                </div>
              </div>
              <Button disableRipple onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
