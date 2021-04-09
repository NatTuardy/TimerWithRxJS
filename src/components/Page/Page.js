import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Button from '../Button/Button';
import saveTime from '../../helpers/saveTime';
import changeToTime from '../../helpers/changeToTime';
import styles from './Page.module.css';
import {Subject } from 'rxjs';


export default function Page() {

  const intervalId = useRef();
  const [time, setTime] = useState(new Date());
  const [clock, setClock] = useState(0);
  const [isRun, setIsRun] = useState(false);
  const [fixedClock, setFixedClock] = useState(0);
  const [wait, setWait] = useState(0);
  
  const subject = new Subject();

  const timeStore = {
    init: () => {
      subject.next(isRun)
    },
    subscribe: setIsRun => subject.subscribe(setIsRun),
    startTime: () => {
      setClock(new Date());
      setIsRun(true);
      subject.next();
    },
    clearTime: () => {
      setIsRun(false);
      clearInterval(intervalId.current);
      setFixedClock(0);
      setClock(new Date());
      subject.next();
    },
    resetTime: () => {
      setFixedClock(0);
      setClock(new Date());
      subject.next();
    },
    waitTime: () => {
      if (!wait) {
        setWait(Date.now());
        return;
      }
      if (isRun & (howTimeWait(wait) <= 300)) {
        setIsRun(false);
        setFixedClock(saveTime(clock, fixedClock));
        clearInterval(intervalId.current);
      }
      setWait(0);
      subject.next();
    },
   
  };

  useLayoutEffect(() => {
    if (isRun) {
      intervalId.current = setInterval(() => setTime(new Date()), 1000);
    }
    return () => () => clearInterval(intervalId.current);
  }, [isRun]);

  const howTimeWait = tempDate => {
    const howTime = Date.now() - tempDate;
    return howTime;
  };



  return (
    <>
      <div className={styles.clockBlock}>
        {isRun
          ? changeToTime(saveTime(clock, fixedClock))
          : changeToTime(fixedClock)}
      </div>
      <div className={styles.buttonBlock}>
        <Button onBtnClick={isRun ? timeStore.clearTime : timeStore.startTime}>
          <p>{isRun ? 'Stop' : 'Start'}</p>
        </Button>
        <Button onBtnClick={timeStore.waitTime}>
          <p>Wait</p>
        </Button>
        <Button onBtnClick={timeStore.resetTime}>
          <span>Reset</span>
        </Button>
      </div>
    </>
  );
}
