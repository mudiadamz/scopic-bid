# SCOPIC BID

A Simple Web application using Laravel  and React, to do simple item bidding

## How to install
### Backend (Laravel)

- set the MySQL db configuration inside `.env`
- run the following commands
```
cd bid-backend
composer install
php artisan migrate
php artisan db:seed
php artisan serve
```

### Front end (ReactJS)

- run the following commands
```
cd bid-frontend
npm install
npm start
```
- now open the browser and visit `localhost:3000`

