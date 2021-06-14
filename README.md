# Contact Manager

### This webapp stores user's contact details of other people which is stored in the database(mongodb).

## Table Of Contents

- [Project Setup](#project-setup)
- [Project Structure](#project-structure)
  - [Frontend](#frontend-client-side-code)
  - [Backend](#backend-server)
  - [Database](#database)
- [Bussiness Logic](#bussiness-logic)
  - [User](#user)
  - [Contact](#contact)
- [Api Documentation](#api-documentation)
  - [Users](#users)
  - [Contacts](#contacts)

## Project Setup

---

### Requirements

- Node.js version 8.x or 10.x
- Recent npm(node package manager)

### To install Angular Cli run:

```
npm install -g @angular/cli
```

More info: https://angular.io/guide/quickstart

### To setup the dependencies run:

```
npm install
```

### To run the app:

```
ng serve
```

Navigate to `http://localhost:4200/` and try the application(Make sure you have the Backend running)

### To run the backend service:

```
cd server
npm install
node app
```

### Database setup:

Make sure you have created a db with mongodb atlas along with 2 collection users and contacts

Then to connect the db to the server follow the steps:-

1. make a file name .env.
2. in that file make some changes as

```
SECRET_KEY = <secret key>
MONGO_URI = <mongodb_uri>
```

To get the uri go to the altas then to connect then choose nodejs backend then copy the uri and dont forget to give the db name and your password inside the uri

## Project Structure

---

### Frontend (Client Side Code) : -

- User first have to first authenticate.

  - Login
  - Registration

  ```sh

  src
  ├── components              #  to to render the view for the application
  |   ├── app
  |   ├── contacts
  |   ├── nav
  |   ├── home
  |   ├── login
  |   ├── pagenotfound
  |   └── register
  ├── services               # functions to connect client to server operations
  |   ├── contact.service
  |   ├── auth-guard.service
  |   └── user.service
  └── models                 # client models
      ├── contact
      └── user
  ```

### Backend (Server) : -

- After the user has logged in

  - Add Contact
  - Edit Contact
  - Delete Contact

  ```sh
  src
  ├── controller          # functions to connect routes to db operations
  ├── config              # db connection and configuration
  ├── midlleware          # to access req , res objects
  ├── models              # db models
  └── routes              # express middlewares (route wise)
  ```

### Database : -

- Users Collection
  - Full Name
  - Email
  - Username
  - Password
- Contacts Collection
  - Contact name
  - Contact email
  - Contact phone
  - Contact Type

## Bussiness Logic

---

### User

1. create users this will create a new user with unique email-address

### Contact

1. create contacts this will create a new contact, required fields are

   - Full Name
   - Email - Address
   - Type
   - Phone Number

2. edit contacts this will edit an existing contact

3. show all contacts list all existing contacts, we have following filtering support

   - filter by userId (auth required)
   - filter by email (auth required) `TBD`

4. delete contacts this will delete an existing contact

## API Documentation

---

## `contacts`

1. `GET api/contact/getContact`

   get all the contacts from the db

2. `GET api/contact/getContactsByUser/{userId}`

   get all the contacts from the user with a given userId

3. `GET api/contact/getContactsById/{id}`

   get the contact from the db with a given id

4. `POST api/contact/savecontact`

   creates a contact with specified userId and a unique id

5. `PUT api/contact/update/{id}`

   update a contact with a given id

6. `DELETE api/contact/delete/{id}`

   update a contact with a given id

## `users`

1. `POST api/user/register`

   creates a user with an unique userId and email

2. `POST api/user/login`

   logs in an user to access the webapp
