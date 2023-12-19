// Animation.js

import { fetchDataFromAPI } from './API';

const ANIMATION_DURATION = 500; // Set your desired animation duration in milliseconds

export const animateIncrement = async (user, result, setResult, setAnimationFrameId) => {
    let status = false;
    const data = await fetchDataFromAPI(user);
    let nextValueFromAPI = 0;
    if (data && data['hydra:member'] && data['hydra:member'][0] && data['hydra:member'][0].totalHours) {
        status = true;
        nextValueFromAPI = data['hydra:member'][0].totalHours;
    }
    const startTime = performance.now();
    let startValue = result;
    const animationFunction = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / ANIMATION_DURATION); // ANIMATION_DURATION is the desired duration in milliseconds
        const nextValue = startValue + (nextValueFromAPI - startValue) * progress;
        setResult(Math.round(nextValue));
        if (progress < 1) {
            setAnimationFrameId(requestAnimationFrame(animationFunction));
        }
    };
    setAnimationFrameId(requestAnimationFrame(animationFunction));
    return status;
};
