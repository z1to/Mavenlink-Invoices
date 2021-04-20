# Mavenlink Report Builder

Task Tracker that builds custom reports/invoices for Mavenlink workspaces.

# Structure

```
└── client: Client. A VueJS & TypeScript application.
└── service: API. A Node, Express & TypeScript application.
```

# Setup

## Client

1. Access the `client/` directory.

```
cd ~/MavenlinkReportBuilder/client
```

2. Install npm packages.

```
npm install
```

## Service

### Database

1. Install and set up MongoDB. [Follow their guides](https://docs.mongodb.com/manual/administration/install-community/) for your operating system.

2. Start MongoDB without access control.

For Homebrew:
```
sudo mongod --port 27017 --dbpath /usr/local/var/mongodb
```

3. Open a new tab in your Terminal and start a mongo instance

```
mongo --port 27017
```

4. Switch to admin database and create admin user.

```
use admin
db.createUser(
  {
    user: "superAdmin",
    pwd: passwordPrompt(),
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

5. Shut down the mongod instance followed by the mongo shell.

```
db.adminCommand( { shutdown: 1 } )
exit
```

6. Open your MongoDB configuration file.

For macOS Intel:
```
open /usr/local/etc/mongod.conf -a TextEdit
```

Find the path for your OS [here](https://docs.mongodb.com/manual/reference/configuration-options/).

7. Add the following to the config file:

```
security:
    authorization: enabled
```

8. Go back to your first Terminal tab and start MongoDB using your new configuration file.

For Homebrew:
```
sudo mongod --config /usr/local/etc/mongod.conf
```

9. Switch to your second tab in the Terminal and start a mongo shell with authentication.

```
mongo --port 27017  --authenticationDatabase "admin" -u "superAdmin" -p
```

### API

1. Access the `service/` directory.

```
cd ~/MavenlinkReportBuilder/service
```

2. Install npm packages.

```
npm install
```

### Environment Variables

1. Open `~/MavenlinkReportBuilder/service/.env.template`.

2. Create a file in `~/service` called `.env`.

3. Paste the content you copied from `.env.template` in `.env`.

4. Fill the keys with the secret values. For example:

```
DB=
DBUSER=
DBPASSWORD=
```

To access variables use `process.env.DB_HOST` for example.

This is a shell file so there can't be spaces around `=`

For more information refer to: https://www.npmjs.com/package/dotenv

# Running the Project

## Client

To use the following commands, do:

```
npm run <command>
```

List of commands:
- `serve`: Start the application
- `build`: Build the application
- `lint`: Run eslint and let it fix the errors

## Service

1. Open a Terminal tab and start MongoDB with the configuration file you had set up.

For Homebrew:
```
sudo mongod --config /usr/local/etc/mongod.conf
```

2. To use the following commands, do:

```
npm run <command>
```

List of commands:
- `start`: Start the application
- `dev`: Start the application with nodemon
- `lint`: Run eslint
- `lint-fix`: Run eslint and let it fix the errors

# Web Service API

Optional parameters are marked as `(optional)`.

## Users

### Register

**Request**
Body, `x-www-form-urlencoded` parameters:
- name
- address
- phone
- email
- password

**Successful Response**
```
{ "message": "Success" }
```

### Log In

**Request**
Body, `x-www-form-urlencoded` parameters:
- email
- password

**Successful Response**
```
{ "message": "Bearer <token>" }
```
## Invoices

### Get invoices 

**Request**
GET /invoices

Query params:
- _id
- invoiceDate
- projectId
- __v

**Successful Response**
```
[
    {
        "_id": "6078f715c462e5d7b064d3a1",
        "invoiceDate": "2021-04-15",
        "projectId": 35576725,
        "__v": 0
    },
    {
        "_id": "6078fcdecafdeed994e5ff98",
        "invoiceDate": "2021-04-15",
        "projectId": 35576725,
        "number": 1,
        "__v": 0
    }...
]
```

# External Packages

## Client
- Axios
- Eslint
- Prettier
- Sass
- TypeScript
- VueJS

## Service
- Axios
- Cors
- Dotenv
- Express
- Helmet
- JSON Web Token
- Mongoose
- Prettier
- TypeScript
- Eslint
- Nodemon
