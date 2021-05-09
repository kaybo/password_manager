# Password Manager

Password manager that allows users to store login credentials that are encrypted inside a database.

## Requisites:

1) Have a SQL database setup

2) Have Node.js and Python installed

## Setup and Installation:

1) git clone the repo

2) go into the back_end directory and run the command:

```
npm install
```

3) go into index.js and modify database authentication credentials

4) go into back_end/helper_methods.js to change the value of secret variable.

## Usage

Server must be run for the python script to function.

1) go into back_end directory and run the command:

```
node index.js
```

2) go into the frontend directory and run the command:

```
python password_manager.py
```

A terminal menu will open. Make sure to create a new user and login each time you use the script.

