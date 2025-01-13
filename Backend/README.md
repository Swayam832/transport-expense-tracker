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

#### Responses

- **201 Created**

  - **Description**: User successfully registered.
  - **Body**: A JSON object containing the authentication token and user details.
  - **Example**:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**

  - **Description**: Validation error or missing required fields.
  - **Body**: A JSON object containing the error details.
  - **Example**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An error occurred on the server.
  - **Body**: A JSON object containing the error message.
  - **Example**:
    ```json
    {
      "message": "Internal server error"
    }
    ```
