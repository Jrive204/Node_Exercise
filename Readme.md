# API Performance Benchmarking

In our efforts to assess the performance of our API, we utilized ApacheBench for benchmarking. The focus was on the API endpoint that fetches population data for specific cities in Florida. Here are our findings:

## Test Configuration:
- **Tool**: ApacheBench, Version 2.3
- **Server**: Localhost (127.0.0.1) on port 5555
- **Node**: 18.16.0
- **fastify**: 4.24.3
- **Node**: 4.18.2

## Fastify API Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.549 seconds
- **Requests per second**: 2817.69
- **Average Time per request**: 177.450 ms
- **Longest request**: 185 ms

### 2. Tampa:
- **Time taken for tests**: 3.540 seconds
- **Requests per second**: 2824.86
- **Average Time per request**: 177.000 ms
- **Longest request**: 182 ms

### 3. Orlando:
- **Time taken for tests**: 3.443 seconds
- **Requests per second**: 2904.44
- **Average Time per request**: 172.150 ms
- **Longest request**: 177 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

#### 1. Miami:
- **Time taken for tests**: 3.295 seconds
- **Requests per second**: 3034.90
- **Average Time per request**: 32.950 ms
- **Longest request**: 36 ms

#### 2. Tampa:
- **Time taken for tests**: 3.361 seconds
- **Requests per second**: 2975.30
- **Average Time per request**: 33.610 ms
- **Longest request**: 39 ms

#### 3. Orlando:
- **Time taken for tests**: 3.265 seconds
- **Requests per second**: 3062.79
- **Average Time per request**: 32.650 ms
- **Longest request**: 39 ms

## Key Observations for Fastify:
- At a concurrency level of 500, the cities showed average request times of approximately 172-177 ms. For a concurrency level of 100, the average times were roughly 32-34 ms.
- Throughput (requests per second) was consistently high, with Orlando having the peak performance at 2904.44 requests per second at a concurrency of 500.
- All tests reported zero failed requests, emphasizing robustness under varying loads.

## Vanilla Node.js API Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

#### 1. Miami:
- **Time taken for tests**: 3.947 seconds
- **Requests per second**: 2533.85
- **Average Time per request**: 197.328 ms
- **Longest request**: 298 ms

#### 2. Tampa:
- **Time taken for tests**: 3.957 seconds
- **Requests per second**: 2526.94
- **Average Time per request**: 197.868 ms
- **Longest request**: 288 ms

#### 3. Orlando:
- **Time taken for tests**: 3.925 seconds
- **Requests per second**: 2547.58
- **Average Time per request**: 196.265 ms
- **Longest request**: 244 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

#### 1. Miami:
- **Time taken for tests**: 3.454 seconds
- **Requests per second**: 2895.48
- **Average Time per request**: 34.537 ms
- **Longest request**: 41 ms

#### 2. Tampa:
- **Time taken for tests**: 3.380 seconds
- **Requests per second**: 2958.56
- **Average Time per request**: 33.800 ms
- **Longest request**: 39 ms

#### 3. Orlando:
- **Time taken for tests**: 3.441 seconds
- **Requests per second**: 2905.90
- **Average Time per request**: 34.413 ms
- **Longest request**: 51 ms

## Key Observations for Vanilla Node.js:
- All cities tested consistently returned results with an average time of around 196-198 ms for the higher concurrency level of 500. For a concurrency level of 100, the average time was around 34-35 ms.
- The throughput (requests per second) for Vanilla Node.js at a concurrency level of 500 was slightly lower than that at a concurrency level of 100.
- There were zero failed requests across all tests, emphasizing the system's robustness under varying loads.

## Express Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.792 seconds
- **Requests per second**: 2637.35
- **Average Time per request**: 189.584 ms
- **Longest request**: 217 ms

### 2. Tampa:
- **Time taken for tests**: 3.821 seconds
- **Requests per second**: 2617.42
- **Average Time per request**: 191.028 ms
- **Longest request**: 214 ms

### 3. Orlando:
- **Time taken for tests**: 3.722 seconds
- **Requests per second**: 2686.61
- **Average Time per request**: 186.108 ms
- **Longest request**: 201 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 4.163 seconds
- **Requests per second**: 2402.23
- **Average Time per request**: 41.628 ms
- **Longest request**: 61 ms

### 2. Tampa:
- **Time taken for tests**: 4.143 seconds
- **Requests per second**: 2413.44
- **Average Time per request**: 41.435 ms
- **Longest request**: 64 ms

### 3. Orlando:
- **Time taken for tests**: 4.097 seconds
- **Requests per second**: 2440.76
- **Average Time per request**: 40.971 ms
- **Longest request**: 64 ms

## Key Observations for Express:
- At a concurrency level of 500, all cities tested showed an average response time between 186-191 ms. For a concurrency level of 100, this dropped to around 40-42 ms.
- Throughput remained consistently high, with Orlando showcasing the peak performance in both concurrency tests.
- No failed requests were reported across all tests, highlighting the robustness of the Express server under load.

## API Performance Benchmarking Conclusion

Given the performance metrics of the three platforms - Fastify, Vanilla Node.js, and Express:

### Vanilla Node.js:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **196-198 ms**.
    - Concurrency Level: 100
        - Average response times: **34-35 ms**.

### Fastify:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **172-177 ms**.
    - Concurrency Level: 100
        - Average response times: **32-34 ms**.

### Express:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **186-191 ms**.
    - Concurrency Level: 100
        - Average response times: **40-42 ms**.

All three platforms exhibited zero failed requests, showcasing their reliability under stress.

When assessing the frameworks based on speed, Fastify clearly demonstrated the shortest response times across both tested concurrency levels. However, it's essential to note that while speed is a critical metric, other factors like maintainability, scalability, and community support can be equally significant when choosing a platform for production.

In conclusion, while all three APIs demonstrated commendable performance, Fastify stands out in terms of response speed in the given tests. Nonetheless, the best choice of framework often depends on a balance of performance and other project-specific criteria.


### Real-world Scenarios

- While Vanilla Node.js might be fast for very basic operations, as the complexity of the application grows (e.g., routing, error handling, middleware operations, etc.), maintaining and optimizing Vanilla Node.js can become more challenging. Frameworks provide structures and patterns that help manage this complexity, and their built-in optimizations can make them more competitive in more complex scenarios.

- While Vanilla Node.js might be faster in some scenarios, using a framework can significantly speed up development time, improve code organization, and enhance maintainability. The performance trade-off might be worth it in many real-world scenarios.

- The benchmark provided was for specific endpoints fetching population data. The performance might vary when dealing with different endpoints, operations, or when adding more features to the API.
