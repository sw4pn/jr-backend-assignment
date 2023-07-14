# Jr. Backend Assignments

API build with Node.js + Express.JS + MySQL

Authentication enabled with JSON web tokens, can be verified with cookies or with bearer tokens.

## TEST API LIVE

TEST WITH POSTMAN :
NOTE: check it locally, since the live server is not available. Change the URL to localhost in your local postman. 
👍
https://www.postman.com/sw4pn/workspace/work/collection/12386459-eceb7966-f585-499c-abad-a426d33d09e3?action=share&creator=12386459
<!-- 
CHECK WITH WEB: https://test-server-9lwq.onrender.com/api/
-->
The web version is not available, please check it locally.


## Assignment: A

- :heavy_check_mark: username --> only alphanumeric
- :heavy_check_mark: username --> between 6-12 letters
- :heavy_check_mark: password --> only A-Za-z0-9 and special characters
- :heavy_check_mark: password --> minimum length is 6 letters

---

- ROUTES FOR AUTH

* ✔️ POST `/api/auth/register` --> Register a user
* ✔️ POST `/api/auth/login` --> Login a user
* ✔️ POST `/api/auth/logout` --> Logout
* ✔️ GET `/api/auth/user` --> Get Self user [LOGIN REQUIRED]
* ✔️ GET `/api/auth/all-users` --> Get all users

## Assignment: B

- :heavy_check_mark: Company Table with `companyId, companyName`
- :heavy_check_mark: `GET` `api/companies/:ID/users` --> this routes will gives all users list with companyId as :ID

- 
- 👍 Solution: http://localhost/api/companies/1/users
- 👍 Solution: http://localhost/api/companies/2/users
- 
<!-- 
- 👍 Solution: https://test-server-9lwq.onrender.com/api/companies/1/users
- 👍 Solution: https://test-server-9lwq.onrender.com/api/companies/2/users
-->

## Assignment: C

- :heavy_check_mark: Order Table with `orderId, title, description, createdAt`
- :heavy_check_mark: `GET` `api/orders/recent` --> this routes will gives all orders list with orders less than 7 days.

- 👍 Solution: https://test-server-9lwq.onrender.com/api/orders/recent

## Others

- :heavy_check_mark: EXTRA ROUTES

---

- _`GET`_ `/api/companies/` --> GET all companies
- _`POST`_ `/api/companies/` --> Create a company [LOGIN REQUIRED]
- _`PUT`_ `/api/companies/:ID` --> Update a company [LOGIN REQUIRED]

---

- _`GET`_ `/api/companies/` --> GET all orders
- _`POST`_ `/api/companies/` --> Create a order [LOGIN REQUIRED]
- _`PUT`_ `/api/companies/:ID` --> Update a order [LOGIN REQUIRED]

---
