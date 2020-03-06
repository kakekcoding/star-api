# Star HRD RESTful API Project

[![Ahmad Rifa'i](https://img.shields.io/badge/author-%40arifai-blue)](https://github.com/arifai) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/757f2061d01843eea590274f04b8daf9)](https://app.codacy.com/manual/arifai/star?utm_source=github.com&utm_medium=referral&utm_content=arifai/star&utm_campaign=Badge_Grade_Dashboard) [![MIT](https://img.shields.io/badge/license-MIT-orange)](https://github.com/arifai/star/blob/master/LICENSE) [![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/arifai/star) [![codecov](https://codecov.io/gh/arifai/star/branch/master/graph/badge.svg)](https://codecov.io/gh/arifai/star)

Star HRD adalah aplikasi HRD berbasis website, dibangun menggunakan [Nodejs](https://nodejs.org/en/ "Go to Nodejs"), [Vuejs](https://vuejs.org/ "Go to Vuejs"), [MongoDB](https://www.mongodb.com/, "Go to MongoDB") sebagai database.

## Software requirements

  * Git
  * Nodejs
  * MongoDB

## How to install

 1. Clone project ini dengan cara menggunakan perintah `git clone` di terminal kamu

	```sh
	git clone https://github.com/arifai/star.git
	```
 2. Masuk kedalam folder project yang sudah kamu clone tadi lalu masukkan perintah `npm install`

    ```sh
    cd star
    npm install
    ```
## Setting up environment

Di dalam folder project, kamu akan menenukan file `.env.example`. Lakukan cara berikut:

 1. Copy file `.env.example` lalu ubah namanya menjadi `.env` atau bisa dengan cara berikut:
 
    ```sh
    cp .env.example .env
    ```
 2. Sesuaikan isi dari file `.env` tersebut dengan pengaturan yang ada di komputer kamu

## How to run

### Running API server locally

```sh
npm run dev
```
## Tests

### Running test case

```sh
npm run test
```
## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.