# Transport Expense Tracker Backend

### `/users/register` Endpoint

#### Description

This endpoint is used to register a new user.

##HTTP Method

`POST`

#### Request Body

The request body should be a JSON object with the following properties:

- `fullname`:(object):
  - `firstname` (string): A string with a minimum length of 3 characters (required)
  - `lastname` (string): A string with a minimum length of 3 characters (optional)
- `email` (string): A string that must be a valid email address (required)
- `password` (string): A string with a minimum length of 6 characters (required)

Example:

- `user` (object):
  - `fullname`:(object):
    - `firstname` (string): A string with a minimum length of 3 characters (required)
    - `lastname` (string): A string with a minimum length of 3 characters (optional)
  - `email` (string): A string that must be a valid email address (required)
  - `password` (string): A string with a minimum length of 6 characters (required)
- `token` (String): JWT Token

### `/users/login` Endpoint

#### Description

This endpoint is used to log in an existing user.

##HTTP Method

`POST`

#### Request Body

The request body should be a JSON object with the following properties:

- `email` (string): A string that must be a valid email address (required)
- `password` (string): A string with a minimum length of 3 characters (required)

Example:

- `user` (object):
  - `fullname`:(object):
    - `firstname` (string): A string with a minimum length of 3 characters (required)
    - `lastname` (string): A string with a minimum length of 3 characters (optional)
  - `email` (string): A string that must be a valid email address (required)
  - `password` (string): A string with a minimum length of 6 characters (required)
- `token` (String): JWT Token
