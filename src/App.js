import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import dog from './dog.png';
import './App.css';
import { Button } from "antd";

function Time() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000); // 每秒更新一次剩余时间

    return () => clearInterval(interval); // 清除定时器
  }, []); // 空数组作为依赖，表示只在组件挂载和卸载时运行

  function calculateTimeRemaining() {
    const targetTime = new Date();
    targetTime.setHours(18, 0, 0, 0); // 设置目标时间为下午六点

    const currentTime = new Date();
    let timeDiff = targetTime.getTime() - currentTime.getTime();

    if (timeDiff < 0) {
      // 如果当前时间已经过了下午六点，则计算到明天下午六点的时间
      targetTime.setDate(targetTime.getDate() + 1);
      timeDiff = targetTime.getTime() - currentTime.getTime();
    }

    return timeDiff;
  }

  function formatTimeRemaining(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
      <div>
        <h1>距离下班（18：00）：</h1>
        <h2>{formatTimeRemaining(timeRemaining)}</h2>
      </div>
  );
}

function App() {

  return (
      <div className="App">
        <header className="App-header">
          <img src={dog} className="App-logo" alt="logo" />
          <p></p>
          <a
              className="App-link"
          >
            该喝水了!
          </a>
          <Time />
        </header>
      </div>
  );
}

export default App;
