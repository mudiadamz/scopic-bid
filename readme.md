# SCOPIC BID

A Simple Web application using Laravel  and React, to do simple item bidding

## How to install
### Backend (Laravel)

- run the following commands
```
cd bid-backend
composer install
```

- rename `.env.example` to `.env`
- set the correct MySQL db configuration inside `.env`
- initiate a dummy data, please answer 'yes'

```
php artisan migrate
php artisan db:seed
```

- run local server
```
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

