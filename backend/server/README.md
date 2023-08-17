# REST API Obole

This is a REST API for the Obole project. It is built using Node.js, npm, and React.

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Configure the `.env` file with the following variables:
   - `MONGODB_URI`: the URI for your MongoDB database.
   - `PORT`: the port number for the server to run on.
   - `EMAIL_USERNAME`: the email address to use for sending emails. (node mailer)
   - `EMAIL_PASSWORD`: the password for the email address. (node mailer)
4. Run `npm start` to start the server.

## Run the tests

    ./run-tests.sh

## Register a new user

### Request

`POST /register`

    http://localhost:5000/register

### json

    {
        "name": "name",
        "lastName": "lastName",
        "phone": "1234567890",
        "email": "my@email.com",
        "gender": "gender",
        "address": "adress",
        "country": "FR",
            "day": 10,
            "month": 5,
            "year": 1996
    }

### Response

    "message": "User Created Successfully",

## Login

### Request

`POST /login`

    http://localhost:5000/login

### json

    {
        "accountNumber" : accountNumber,
        "password": "password"
    }

### Response

    {
        "message": "Login successful",
        "token": "your token"
    }

## Get User informations

### Request

`GET /user`

    http://localhost:5000/user

### Authorization

        Bearer your token

### Response

    {
        "Information": {
            ...
        },

        "Account": {
            ...
        },

        "Balance": {
            ...
        },

        "\_id": "64da0e036e6f599ac3782ce7",

        "Card": [
            {
                ...
            },
            {
                ...
            }
        ],

        "SavingsAccount": [
            {
                ...
            },
            {
                ...
            }
        ],
    }

## Do transaction between 2 accounts

### Request

`POST /transaction/:destinationAccountNumber`

    http://localhost:5000/transaction/110898595046

### Authorization

        Bearer your token

### json

    {
        "amount": 200,
        "currency": "your currency", - ["USD", "EUR", "GBP", "JPY", "CAD"]
        "description": "your description",
        "type": "type of transaction" - ["Deposit", "Withdrawal", "Transfer", "Credit"]
    }

### Response

    {
        "sourceAccount": "788884166645",
        "destinationAccount": "110898595046",
        "amount": 200,
        "currency": "USD",
        "description": "Payment for services",
        "type": "Transfer",
        "status": "pending",
        "_id": "64de12ff0b09b926e00054c1",
        "date": "2023-08-17T12:30:55.908Z",
    }

## Cancel a transaction

### Request

`PUT /transaction/:_idTransaction/cancel`

    chttp://localhost:5000/transaction/64de14850b09b926e00054dd/cancel

### Authorization

        Bearer your token

### Response

    Status: 200 OK
    {
        "message": "Transaction cancelled successfully."
    }

    Status: 400 Bad Request
    {
        "message": "Transaction already cancelled."
    }

## Get transaction history account

### Request

`GET /transaction`

    http://localhost:5000/transaction

### Authorization

        Bearer your token

### Response

    Status: 200 OK
    {
        "transactions": [
            {
                "_id": "64de12ff0b09b926e00054c1",
                "sourceAccount": "788884166645",
                "destinationAccount": "110898595046",
                "amount": 7,
                "currency": "USD",
                "description": "Payment for services",
                "type": "Transfer",
                "status": "completed",
                "date": "2023-08-17T12:30:55.908Z",
            },
            {
                "_id": "64de12ff0b09b926e00054c1",
                "sourceAccount": "788884166645",
                "destinationAccount": "110898595046",
                "amount": 200,
                "currency": "USD",
                "description": "Payment for services",
                "type": "Transfer",
                "status": "cancelled",
                "date": "2023-08-17T12:30:55.908Z",
            }
        ]
    }

## Do transaction between main accout and savings account

### Request

`PUT /transaction/saving`

    http://localhost:5000/transaction/saving

### Authorization

        Bearer your token

### json

    {
        "amount": 100,
        "destinationAccountType": "A"
    }

### Response

    Status: 201 Created
    {
        "sourceAccount": "788884166645",
        "destinationAccount": "435064872023",
        "amount": 100,
        "currency": "EUR",
        "description": "Transfer to savings account",
        "type": "Transfer",
        "status": "pending",
        "_id": "64de165d0b09b926e00054f9",
        "date": "2023-08-17T12:45:17.701Z",
    }

## Do transaction between savings account and main accout

### Request

`GET /transaction/unsaving`

    http://localhost:5000/transaction/unsaving

### Authorization

        Bearer your token

### json

        {
            "amount": 100,
            "sourceAccountType": "A"
        }

### Response

        Status: 201 Created
        {
            "sourceAccount": "435064872023",
            "destinationAccount": "788884166645",
            "amount": 100,
            "currency": "EUR",
            "description": "Transfer to main account",
            "type": "Transfer",
            "status": "pending",
            "_id": "64de165d0b09b926e00054f9",
            "date": "2023-08-17T12:45:17.701Z",
        }

## Get all Card informations account

### Request

`GET /card`

    http://localhost:5000/card

### Authorization

        Bearer your token

### Response

    Status: 200 OK
    {
        "cards": [
            {
                "cardNumber": 6391265307460021,
                "expirationDate": "08/28",
                "code": 1423,
                "CCV": 880,
                "locked": false,
                "opposition": false,
                "limit": 1000,
                "used": 80,
                "_id": "64da0e036e6f599ac3782ce8",
            },
            {
                "cardNumber": 6951493212146607,
                "expirationDate": "08/28",
                "code": 7697,
                "CCV": 797,
                "locked": false,
                "opposition": false,
                "limit": 5000,
                "used": 0,
                "_id": "64db50aeefeef25a87b120b1"
            }
        ]
    }

## Create a new Card

### Request

`POST /card`

    http://localhost:5000/card

### Authorization

        Bearer your token

### Response

    Status: 201 created
    {
        "message": "Card added successfully."
    }

## Change status card

### Request

`PUT /card/:cardNumber`

    http://localhost:5000/card/6391265307460021

### Authorization

        Bearer your token

### json

    {
        "opposition": true, // or false
        "locked": true, // or false
        "limit" : 5000
    }

### Response

    Status: 200 OK
    {
        "message": "Card updated successfully."
    }

## Delete a Card

### Request

`DELETE /card/:cardNumber`

    http://localhost:5000/card/8174848460626667

### Authorization

        Bearer your token

### Response

    Status: 200 OK
    {
        "message": "Card deleted successfully."
    }

## Do payment with card

### Request

`POST /payment`

        http://localhost:5000/payment

### json

    {
        "cardNumber": 6391265307460021,
        "expirationDate": "08/28",
        "CCV": 880,
        "cardHolderName": "John Doe",
        "amount": 20,
        "categorie": "food",
    }

### Response

    Status: 200 OK
    {
        "message": "Payment done successfully."
    }

    Status: 500 Internal Server Error
    {
        "error": "Failed to process payment: Error while check status: The card is opposition or locked."
    }

## Get all payment informations account

### Request

`GET /payment`

    http://localhost:5000/payment

### Authorization

        Bearer your token

### Response

    Status: 200
    {
        "_id": "64da3c7396652ffe599e2ed7",
        "accountNumber": 788884166645,
        "cardNumber": 6391265307460021,
        "cardHolderName": "Dev",
        "amount": 20,
        "categorie": "Others",
        "date": "2023-08-14T14:38:43.942Z",
    },
    {
        "_id": "64da3c7a96652ffe599e2f2e",
        "accountNumber": 788884166645,
        "cardNumber": 6391265307460021,
        "cardHolderName": "Dev",
        "amount": 20,
        "categorie": "Others",
        "date": "2023-08-14T14:38:50.054Z",
    },

## Formated data for statistics (transaction and payment)

### Request

`GET /stats`

    http://localhost:5000/statistics

### Authorization

        Bearer your token

### Response

    Status:200
    "transactions": [
        {
            "amount": 100,
            "currency": "EUR",
            "description": "Transfer to savings account",
            "type": "Transfer",
            "date": "2023/08/14"
        },
        {
            "amount": 100,
            "currency": "EUR",
            "description": "Transfer to savings account",
            "type": "Transfer",
            "date": "2023/08/14"
        },
    ],

    "payments": [
        {
            "amount": 20,
            "categorie": "Others",
            "date": "2023/08/14"
        },
        {
            "amount": 20,
            "categorie": "Others",
            "date": "2023/08/14"
        },
    ]

## Create savings account

### Request

`POST /saving`

    http://localhost:5000/saving

### Authorization

        Bearer your token

### json

    {
        "type" : "jeune" // or "A" or "B" ...
    }

### Response

    Status: 201 created
    {
        "message": "Saving account added successfully."
    }

    Status: 400 Bad Request
    {
        "error": "Savings account with the same type already exists."
    }

## Get all savings account

### Request

`GET /saving`

    http://localhost:5000/saving

### Authorization

        Bearer your token

### Response

    Status: 200
     {
        "savingAccountNumber": 435064872023,
        "type": "A",
        "savingsBalance": 1600,
        "interestRate": 1,
        "_id": "64da0e036e6f599ac3782ce9"
    },
    {
        "savingAccountNumber": 349216401584,
        "type": "jeune",
        "savingsBalance": 20987,
        "interestRate": 1,
        "_id": "64da0ed99050aab2f69e9e54"
    }
