# Star HRD RESTful API Project

[![Ahmad Rifa'i](https://img.shields.io/badge/author-%40arifai-blue)](https://github.com/arifai) [![MIT](https://img.shields.io/badge/license-MIT-orange)](https://github.com/arifai/star/blob/master/LICENSE) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/757f2061d01843eea590274f04b8daf9)](https://app.codacy.com/manual/arifai/star?utm_source=github.com&utm_medium=referral&utm_content=arifai/star&utm_campaign=Badge_Grade_Dashboard) [![codecov](https://codecov.io/gh/arifai/star/branch/master/graph/badge.svg)](https://codecov.io/gh/arifai/star) [![CircleCI](https://circleci.com/gh/circleci/circleci-docs.svg?style=svg)](https://circleci.com/gh/arifai/star)

The API server for Star HRD

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
npm test
```

### Running test & coverage
```sh
npm run test:cover
```

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.

Made with :hearts: in Indonesia :indonesia:    
