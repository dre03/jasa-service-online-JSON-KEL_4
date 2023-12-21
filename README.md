# Boilerplate Framework Backend Bootcamp Vocasia

## Overview
 Project ini sebagai acuan untuk mengerjakan project selama bootcamp berlangsung.framework ini menggunakan basic structure MVC(Model View Controller) untuk mempermudah pengerjaan project.Struktur dari project ini terinspirasi dari Laravel framework.

### How To Use ?
* silahkan `use this template`
* kemudian jalankan 

```bash
npm install
```
* setelah itu copy file `.env.example` pada terminal dengan cara :

```bash
cp .env.example .env
```
* kemudian isikan configurasi pada file `.env` silahkan disesuaikan sendiri
```
APP_NAME = Vocasia Backend Framework
APP_PORT = 3000
APP_URL = http://localhost
NODE_ENV=development

# database
DB_HOST=127.0.0.1
DB_DRIVER=mysql
DB_NAME=vocasia
DB_USER=root
DB_PASS=root
DB_PORT=3306

```
* Coba jalankan menggunakan script dibawah ini : 
```
npm run start
```
* kemudian coba akses url dibawah ini menggunakan http request app favorit kalian :
```
http://localhost:3000/
```
jika berhasil akan muncul seperti ini : 
```json
{
    "message" : "Hello exampleController"
}
```

### How To Generate Controller Automatic ?
* untuk membuat controller secara otomatis silahkan jalankan skrip berikut di terminal :
  ```
  npm run generate-controller your_controller_name
  ```
* jika berhasil maka akan terbuat file controller baru
# Resources 
* ExpressJs
* Sequelize
* Nodemon
* mysql2
