# OOCA Stress Tracking API
## 1. Problem
- OOCA Stress Tracking
#### Main Function:

- Stress Tracking
    - create/ get user stress tracking

## 2. Solution
#### Technologies:
- Node.js (Express.js)
- MongoDB
- Docker

#### Architecture:
- Built this based on the Clean Architecture
- see in document folder: architecture.png

#### How to run project
```bash   
   docker-compose up --build
```
#### How to run test

```bash   
   npm run test
```
#### How to use API
- sign up: call API: /user/signup to create a user
- login: call API /user/login to login and get accessToken
- set accessToken in header "Authorization" to call API

#### API Design
- see in document folder: api.yaml
- start app and access http://localhost:8080/ to see swagger api