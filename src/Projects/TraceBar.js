import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 시간 범위를 백분율로 변환하는 함수
const calculateProgress = (start, end, itemStart, itemEnd) => {
  const totalDuration = end - start;
  const itemStartOffset = itemStart - start;
  const itemEndOffset = itemEnd - start;
  const startPercent = (itemStartOffset / totalDuration) * 100;
  const endPercent = (itemEndOffset / totalDuration) * 100;
  return {
    startPercent: Math.max(0, Math.min(startPercent, 100)), // 0% 이상 100% 이하로 제한
    endPercent: Math.max(0, Math.min(endPercent, 100)),
  };
};

const parseISOTime = (isoTimeStr) => new Date(isoTimeStr);

const ProgressBar = ({ startPercent, endPercent, label }) => (
  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
    <span style={{ width: "400px" }}>{label}</span>
    <div style={{ flex: 1, height: "8px", backgroundColor: "#ddd", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          left: `${startPercent}%`,
          width: `${endPercent - startPercent}%`,
          height: "100%",
          backgroundColor: "#4caf50",
        }}
      />
    </div>
    <span style={{ marginLeft: "8px", width: "200px" }}>{`${Math.round(startPercent)}% - ${Math.round(endPercent)}%`}</span>
  </div>
);

const TraceBar = () => {
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [traceId, setTraceId] = useState('7803d744-e74a-4a5d-8dbb-ea50187ca583');
  const [traces, setTraces] = useState([]);
  
  const [startTime, setStartTime] = useState("2024-10-30T10:00:00.000Z");
  const [endTime, setEndTime] = useState("2024-10-30T11:00:00.000Z");

  useEffect(() => {
    axios.get(url+'/api/traces/'+traceId)
      .then(response => {
        setTraces(response.data)
        setStartTime(response.data[0].start_time)
        setEndTime(response.data[0].end_time)
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
    });
  }, [traceId])

  const start = parseISOTime(startTime);
  const end = parseISOTime(endTime);

  return (
    <div style={{ padding: "16px", maxWidth: "1500px", margin: "auto" }}>
      <h3>Time Range Progress</h3>
      <div style={{ marginTop: "16px" }}>
        {traces.map((trace) => {
          const itemStart = parseISOTime(trace.start_time);
          const itemEnd = parseISOTime(trace.end_time);
          const { startPercent, endPercent } = calculateProgress(start, end, itemStart, itemEnd);
          // <div>
          //   {(itemEnd - itemStart)/1000} ms
          // </div>
          return <ProgressBar key={trace.span_id} label={trace.span_id} startPercent={startPercent} endPercent={endPercent} />;
        })}
      </div>
    </div>
  );
};

export default TraceBar;
