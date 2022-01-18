import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 500,
  duration: '15s',
};

const url = 'http://localhost:3000/reviews';

export default function () {
  const res = http.get(url);
  sleep(1);
  check (res, {
    'is this a status 200???': response => response.status === 200,
    'transaction time < 200ms': response => response.timings.duration < 200,
    'transaction time < 500ms': response => response.timings.duration < 500,
    'transaction time < 1000ms': response => response.timings.duration < 1000,
    'transaction time < 2000ms': response => response.timings.duration < 2000,
  });
}

