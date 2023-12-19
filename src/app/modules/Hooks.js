// Hooks.js

import { useState } from 'react';

export const useHomeState = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(0);
    const [animationFrameId, setAnimationFrameId] = useState(null);
    const [monthData, setMonthData] = useState(null);
    const [rangeData, setRangeData] = useState(null);
    const [loading, setLoading] = useState(true);

    return {
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
    };
};
