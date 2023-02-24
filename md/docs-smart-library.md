## 📚 | Docs - Smart Library Rest API (Unofficial)

This documentation is made for developers developing applications through the rest api.
This rest api was accidentally found in the logs of my cellphone, it was found because there was a problem with some functions :/

## 📝 | Mapping
![Mapping](https://cdnimg.mzea.vercel.app/__localhost/c5481575d9b2f398c62009dd707ce018123aedb90b15ba.jpeg)

## ✅ | Authorization

- Usage:
  - Module: JWT
  - Require: true
  - Decode:
    - alg: "HS256"
    - typ: "JWT"
  - Payload Mapping:
    ```
    {
      "organizations": [
        Number
      ],
      "user_id": Number,
      "roles": [
        10
      ],
      "iss": "SCOOP",
      "sig": StringAuth,
      "user_name": "admin@example.com",
      "email": "admin@example.com",
      "device_id": StringAuthDevice
    }
    ```
## 📌 | Endpoint

- Without Authorization
  - Login : [POST] https://scoopadm.apps-foundry.com/scoopcor/api/v1/auth/login
  - Catalog : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/organizations/[:org]/shared-catalogs/[:id_catalog]
  - Catalog Search : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/organizations/[:org]/shared-catalogs/[:id_catalog]?offset=0&limit=25&q=[:StringInput]
- With Authorization
  - User Profile : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/users/[:id]
  - Change Password : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/auth/change-password
  - Watch List : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/users/current-user/watch-list
  - List Borrow : [GET] https://scoopadm.apps-foundry.com/scoopcor/api/v1/users/current-user/borrowed-items?order=-borrowing_start_time
