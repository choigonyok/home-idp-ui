import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProgressBar.css';  // 스타일을 위한 CSS

function ProgressBar({name, tag}) {
  // 진행 상태를 저장하는 state (0 ~ 100)
  const [progress, setProgress] = useState(0);
  const [fail, setFail] = useState(false);
  

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://api-idp.choigonyok.com:8080/progress/'+name+":"+tag)  // 서버에서 진행 상황을 받아오는 요청
        .then(response => {
          const newProgress = response.data.length;

          console.log(response.data);
          console.log(response.data[response.data.length - 1]);

          setProgress(newProgress * 25);  // 진행 상태를 업데이트
          if (response.data[response.data.length - 1].state == 1) { // FAIL
            setFail(!fail);
            setTimeout(() => console.log("after"), 10000);
            clearInterval(interval);
          }
          if (newProgress >= 4) {
            clearInterval(interval);  // 진행 상태가 100%가 되면 인터벌 종료
          }
        })
        .catch(error => {
          console.error('Error fetching progress:', error);
          clearInterval(interval);  // 에러가 발생하면 인터벌 종료
        });
    }, 1000);  // 1초마다 요청

    // 컴포넌트가 언마운트되면 인터벌을 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-bar-container">
      <div style={{ width: `${progress}%` }} className={fail?'progress-bar-fail':'progress-bar-success'}>
        {progress}%
      </div>
    </div>
  );
}

export default ProgressBar;
