import {useEffect} from 'react';
import ProgressBarManager from './ProgressBarManager';
import {uuidv4} from "../../utils";

export const LazyLoad = () => {
    useEffect(() => {
        const processName = uuidv4();
        ProgressBarManager.start(processName);

        return function () {
            ProgressBarManager.stop(processName);
        }
    });

    return '';
};