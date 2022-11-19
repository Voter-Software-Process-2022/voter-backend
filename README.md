# Voter Backend

## About The Project

![Tests](https://github.com/Voter-Software-Process-2022/voter-backend/actions/workflows/tests.yml/badge.svg)
[![codecov](https://codecov.io/gh/Voter-Software-Process-2022/voter-backend/branch/main/graph/badge.svg?token=E5LKK421GB)](https://codecov.io/gh/Voter-Software-Process-2022/voter-backend)

Backend for Voter module, act as a middleware to communicate between other modules.

### Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Getting Started

### Prerequisites

| Name | Version |
|------|---------|
| yarn | any |
| node | 16.13.2 |

### Installation
1. Clone this repository and and install packages using **yarn**.
2. Create an env file that contains
```
PORT=

NODE_ENV=
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_DATABASE_NAME=

REDIS_HOSTNAME=
REDIS_PORT=
REDIS_PASSWORD=

ACCESS_TOKEN_PRIVATE_KEY=
ACCESS_TOKEN_PUBLIC_KEY=

ACCESS_TOKEN_EXPIRES_IN=
ORIGINS=http://localhost,^.*$
```
Ask any contributor to get some help

3. Run project locally
```
yarn dev
```
