# Contact Manager

### This webapp stores user's contact details of other people which is stored in the database(mongodb).

<br>

## Project Structure

---

### Frontend (Client Side Code) : -

- User first have to first authenticate.

  - Login
  - Registration

  ```sh

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
  - Contact Photo

<br>

## Bussiness Logic

---

-

## API Documentation

---

## `contacts`

1. `GET /getcontact`

   Get all the contact from the user

2. ``

## `users`
