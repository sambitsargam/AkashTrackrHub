"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js';

const Chat = () => {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [payloads, setPayloads] = useState(['']);
  const [requestHeaders, setRequestHeaders] = useState('');
  const [requestCount, setRequestCount] = useState(1);
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [validationErrors, setValidationErrors] = useState({}); // State to track validation errors

  const addPayloadInput = () => {
    setPayloads([...payloads, '']);
  };

  const handlePayloadChange = (index, value) => {
    const updatedPayloads = [...payloads];
    updatedPayloads[index] = value;
    setPayloads(updatedPayloads);
  };

  const isJsonValid = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!apiEndpoint) {
      newErrors.apiEndpoint = "API Endpoint is required";
    }

    payloads.forEach((payload, index) => {
      if (!isJsonValid(payload)) {
        newErrors[`payload${index}`] = `Payload ${index + 1} is not valid JSON`;
      }
    });

    if (requestHeaders && !isJsonValid(requestHeaders)) {
      newErrors.requestHeaders = "Request Headers are not valid JSON";
    }

    if (requestCount <= 0) {
      newErrors.requestCount = "Number of requests must be a positive integer";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const executeBenchmark = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    const headersObj = JSON.parse(requestHeaders || '{}');
    const requests = [];
    const requestDetails = [];

    for (let i = 0; i < requestCount; i++) {
      const randomPayload = JSON.parse(payloads[Math.floor(Math.random() * payloads.length)]);
      const start = Date.now();

      requests.push(
        axios.post(apiEndpoint, randomPayload, { headers: headersObj })
          .then(response => {
            const end = Date.now();
            const duration = end - start;
            requestDetails.push({
              payload: randomPayload,
              response: response.data,
              status: 'success',
              time: duration
            });
            return { status: 'success', time: duration };
          })
          .catch(error => {
            const end = Date.now();
            const duration = end - start;
            requestDetails.push({
              payload: randomPayload,
              response: error.message,
              status: 'failed',
              time: duration
            });
            return { status: 'failed', time: duration };
          })
      );
    }

    const overallStart = Date.now();
    const results = await Promise.all(requests);
    const overallEnd = Date.now();
    const totalDuration = overallEnd - overallStart;

    const successCount = results.filter(result => result.status === 'success').length;
    const failureCount = results.filter(result => result.status === 'failed').length;
    const avgTime = totalDuration / requestCount;

    setSummary({ successCount, failureCount, avgTime });
    setDetails(requestDetails);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <div className="mb-4">
        <label className="block mb-2 text-red-500">API Endpoint</label>
        <input
          type="text"
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.apiEndpoint && <p className="text-red-500">{validationErrors.apiEndpoint}</p>}
      </div>

      {payloads.map((payload, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 text-red-500">Payload {index + 1}</label>
          <textarea
            value={payload}
            onChange={(e) => handlePayloadChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
          {validationErrors[`payload${index}`] && <p className="text-red-500">{validationErrors[`payload${index}`]}</p>}
        </div>
      ))}
      <button
        onClick={addPayloadInput}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Payload
      </button>



      <div className="mb-4">
        <label className="block mb-2 text-red-500">Number of Requests</label>
        <input
          type="number"
          value={requestCount}
          onChange={(e) => setRequestCount(parseInt(e.target.value, 10))}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.requestCount && <p className="text-red-500">{validationErrors.requestCount}</p>}
      </div>

      <button
        onClick={executeBenchmark}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Start Benchmarking
      </button>

      {isLoading && <p className='mt-4'>Loading...</p>}

      {summary.successCount !== undefined && (
        <div className="mt-4">
          <p>Successful Requests: {summary.successCount}</p>
          <p>Failed Requests: {summary.failureCount}</p>
          <p>Average Time: {summary.avgTime.toFixed(2)} ms</p>
          <Bar
            data={{
              labels: ['Successful', 'Failed'],
              datasets: [
                {
                  label: 'Number of Requests',
                  data: [summary.successCount, summary.failureCount],
                  backgroundColor: ['#4caf50', '#f44336']
                }
              ]
            }}
          />
        </div>
      )}

      {details.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Request Details</h2>
          <div className="space-y-4">
            {details.map((detail, index) => (
              <details key={index} className="border border-gray-300 p-2 rounded">
                <summary className="cursor-pointer">
                  Request {index + 1} - {detail.status.toUpperCase()}
                </summary>
                <div className="mt-2">
                  <pre className="bg-gray-100 p-2 rounded">
                    <strong>Payload:</strong> {JSON.stringify(detail.payload, null, 2)}
                  </pre>
                  <pre className="bg-gray-100 p-2 mt-2 rounded">
                    <strong>Response:</strong> {JSON.stringify(detail.response, null, 2)}
                  </pre>
                  <p><strong>Time:</strong> {detail.time} ms</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
