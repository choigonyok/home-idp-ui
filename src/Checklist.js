import React, { useState } from 'react';

function Checklist() {
  const [useDockerfile, setUseDockerfile] = useState(false);
  const [useIngress, setUseIngress] = useState(false);
  const [useSecrets, setUseSecrets] = useState(false);
  const [useConfigmaps, setUseConfigmaps] = useState(false);

  // 체크박스 변경 핸들러
  const handleChange1 = () => {
    setUseIngress(!useIngress); // 체크 상태 토글
  };

  const handleChange2 = () => {
    setUseSecrets(!useSecrets); // 체크 상태 토글
  };

  const handleChange3 = () => {
    setUseConfigmaps(!useConfigmaps); // 체크 상태 토글
  };

  const handleChange4 = () => {
    setUseDockerfile(!useDockerfile); // 체크 상태 토글
  };

  return (
    <div>
      <h1>Checklist</h1>
      
      <label>
        <input
          type="checkbox"
          checked={useIngress}
          onChange={handleChange1}
        />
        Ingress
      </label>

      <label>
        <input
          type="checkbox"
          checked={useSecrets}
          onChange={handleChange2}
        />
        Secrets
      </label>

      <label>
        <input
          type="checkbox"
          checked={useConfigmaps}
          onChange={handleChange3}
        />
        Configmaps
      </label>

      <label>
        <input
          type="checkbox"
          checked={useDockerfile}
          onChange={handleChange4}
        />
        Dockerfile
      </label>

      <div>
        <p>Ingress is {useIngress ? 'checked' : 'unchecked'}</p>
          <div>
            {useIngress && (
              <div className="toggle-content">
                <p>이것은 토글 형식의 내용을 담고 있는 영역입니다.</p>
              </div>
            )}
          </div>
        <p>Secret is {useSecrets ? 'checked' : 'unchecked'}</p>
        <p>Configmaps is {useConfigmaps ? 'checked' : 'unchecked'}</p>
        <p>Dockerfile is {useDockerfile ? 'checked' : 'unchecked'}</p>
      </div>
    </div>
  );
}

export default Checklist;
