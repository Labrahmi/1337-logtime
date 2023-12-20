// Page.js

'use client';

import { React, useEffect } from 'react';
import { DatePicker, Button, Input, Skeleton, ConfigProvider, theme } from 'antd';
import { useHomeState } from './modules/Hooks';
import { animateIncrement } from './modules/Animation';
import { generateDefaultDates } from './modules/DateUtils';

const { RangePicker } = DatePicker;

const Home = () => {
  const {
    inputValue,
    setInputValue,
    result,
    setResult,
    animationFrameId,
    setAnimationFrameId,
    monthData,
    setMonthData,
    rangeData,
    setRangeData,
    loading,
    setLoading,
  } = useHomeState();

  useEffect(() => {
    const savedValue = localStorage.getItem('inputValue');
    if (savedValue) {
      setInputValue(savedValue);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMonthChanged = (date) => {
    setMonthData(date);
  };

  const handleRangeChanged = (date) => {
    setRangeData(date);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    localStorage.setItem('inputValue', value);
  };

  const handleCalculateClick = () => {
    const dates = generateDefaultDates(new Date(), rangeData, monthData);
    if (inputValue !== "" && dates) {
      const user = {
        login: inputValue,
        startDate: dates.pastMonthDate,
        endDate: dates.currentMonthDate,
      };
      animateIncrement(user, result, setResult, setAnimationFrameId);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculateClick();
    }
  };
  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
      "token": {
        "colorPrimary": "#ffffff",
        "colorInfo": "#ffffff"
      }
    }}>
      <main className="flex justify-center items-center flex-col h-full transition-all duration-300 bg-black bg-opacity-85">
        <img className='opacity-50 select-none' src='/images/1337.webp' />
        {loading && <Skeleton className='md:w-[34rem] px-8 relative sm:-top-[2rem] md:-top-[6rem] xl:-top-[12rem]' active />}
        {!loading && (
          <div className='flex flex-col items-center space-y-2 md:w-[34rem] relative sm:-top-[4rem] md:-top-[12rem] xl:-top-[18rem]'>
            <div className='flex flex-col md:flex-row justify-center items-center space-x-4 w-full'>
              <DatePicker onChange={handleMonthChanged} size={"large"} className='w-full' picker="month" />
              <div className=''></div>
              <RangePicker onChange={handleRangeChanged} size={"large"} className='w-full m-0' />
            </div>
            <div className='md:text-[12rem] text-[6rem] text-white opacity-50 select-none font-semibold drop-shadow-xl bg-gradient-radial '>{result}<span className='md:text-[10rem] text-[4rem]'>h</span></div>
            <div className='flex space-x-2'>
              <Input id="input" size={"large"} placeholder={inputValue} onChange={(e) => handleInputChange(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
              <Button size={"large"} type="dashed" onClick={handleCalculateClick}>Calculate</Button>
            </div>
          </div>
        )}
      </main>
    </ConfigProvider>
  );
};

export default Home;
