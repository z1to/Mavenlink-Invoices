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
- number
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

### Get invoice by id

**Request**
GET /invoices/{{id}}

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

### Get invoice lines

**Request**
GET /invoices/invoiceLines

Query params:
- _id:
- datePerformed
- timeInMinutes
- notes
- approved
- storyId
- taskTitle
- taskDescription
- rate
- timeEntryId
- invoiceId

**Successful Response**
```
[
    {
        "_id": "6079022a4f4bc1dc2e09ab5d",
        "datePerformed": "2021-01-16T00:00:00.000Z",
        "timeInMinutes": 420,
        "notes": null,
        "approved": false,
        "storyId": 687005635,
        "taskTitle": "Consulting",
        "taskDescription": null,
        "rate": 10,
        "timeEntryId": 1838262685,
        "invoiceId": "6079022a4f4bc1dc2e09ab5a",
        "__v": 0
    } ...
]
```
### Get invoice line by id

**Request**
GET /invoices/invoiceLines/{{id}}

**Successful Response**
```
[
    {
        "_id": "6079022a4f4bc1dc2e09ab5d",
        "datePerformed": "2021-01-16T00:00:00.000Z",
        "timeInMinutes": 420,
        "notes": null,
        "approved": false,
        "storyId": 687005635,
        "taskTitle": "Consulting",
        "taskDescription": null,
        "rate": 10,
        "timeEntryId": 1838262685,
        "invoiceId": "6079022a4f4bc1dc2e09ab5a",
        "__v": 0
    } ...
]
```
### Delete invoice

**Request**
DELETE /invoiceLines/delete/{{id}}

**Successful Response**
```
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```
### Delete invoice line

**Request**
DELETE /invoices/invoiceLines/delete/{{id]}

**Successful Response**
```
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```
### Create invoice

**Request**
POST /invoices/create

Body `JSON` parameters:
- invoiceDate: The date of the invoice
- projectId: Mavenlink Project Id
- datePerformed: Automatically imported from Mavenlink
- timeInMinutes: Automatically imported from Mavenlink
- notes: Automatically imported from Mavenlink
- approved: Automatically imported from Mavenlink
- storyId: : Automatically imported from Mavenlink
- taskTitle: : Automatically imported from Mavenlink
- taskDescription: : Automatically imported from Mavenlink
- rate: : Automatically imported from Mavenlink
- timeEntryId: Automatically imported from Mavenlink

**Sample Request**
```
{"invoiceData": {
   "invoiceDate": "2021-04-09",
   "projectId": "35576725",
   "invoiceLineData": [
      {
         "datePerformed": "2021-01-15",
         "timeInMinutes": 420,
         "notes": null,
         "approved": false,
         "storyId": "687005635",
         "taskTitle": "Consulting",
         "taskDescription": null,
         "rate": 10,
         "timeEntryId": "1838262675"
      } ...
   ]
 }
}
```

**Successful Response**
Status: 200 OK
```
{
    "_id": "607b3a56ef0c73fefb2af71b",
    "invoiceDate": "2021-04-09",
    "projectId": 35576725,
    "number": 22,
    "__v": 0
}
```
**Bad Request**
Status: 400 Bad Request

### Edit invoice

**Request**
PUT /invoices/update

Body `JSON` parameters:
- id: The invoice id 
- invoiceDate
- projectId
- number

**Sample Request**
```
{"id": "607b3a56ef0c73fefb2af71b",
"newValues": {
    "invoiceDate": "2021-05-15"
}
}
```

**Successful Response**
Status: 200 OK
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```
**Bad Request**
Status: 400 Bad Request

### Edit invoice line

**Request**
PUT /invoices/invoiceLines/update

Body `JSON` parameters:
- id: invoice line id
- datePerformed
- timeInMinutes
- notes
- approved
- storyId
- taskTitle
- taskDescription
- rate
- timeEntryId

**Sample Request**
```
{"id": "6079022a4f4bc1dc2e09ab5d",
"newValues": {
    "rate": "50"
}
}
```

**Successful Response**
Status: 200 OK
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```
**Bad Request**
Status: 400 Bad Request

### Get Mavenlink Tasks

**Request**
GET /tasks/mavenlink

Query parameters: 
Any of the query parameters specified in the Mavenlink documentation for Stories


**Successful Response**
Status: 200 OK

```
{
    "results": [
        {
            "key": "stories",
            "id": "687005635"
        } ...
    ],
    "stories": {
     "687005635": {
            "title": "Consulting",
            "description": null,
            "updated_at": "2021-04-17T14:38:56-07:00",
            "assignment_timestamped_at": "2021-04-17T14:38:56-07:00",
            "created_at": "2021-01-14T10:42:32-08:00",
            "due_date": "2021-04-13",
            "start_date": "2019-12-15",
            "story_type": "task",
            "state": "started",
            "position": 100000000,
            "archived": false,
            "deleted_at": null,
            "sub_story_count": 0,
            "percentage_complete": 100,
            "priority": "normal",
            "has_proofing_access": false,
            "ancestor_ids": [],
            "subtree_depth": 0,
            "ancestry_depth": 0,
            "time_trackable": true,
            "time_estimate_in_minutes": 150000,
            "logged_billable_time_in_minutes": 133860,
            "logged_nonbillable_time_in_minutes": 0,
            "sub_stories_time_estimate_in_minutes": null,
            "sub_stories_billable_time_in_minutes": null,
            "weight": null,
            "budget_estimate_in_cents": 37500000,
            "budget_used_in_cents": 26469750,
            "uninvoiced_balance_in_cents": 26469750,
            "invoiced_balance_in_cents": 0,
            "sub_stories_budget_estimate_in_cents": null,
            "sub_stories_budget_used_in_cents": null,
            "fixed_fee": false,
            "billable": true,
            "workspace_id": "35576775",
            "creator_id": "16925965",
            "parent_id": null,
            "root_id": null,
            "current_assignment_ids": [
                "476005615",
                "476015325",
                "476015545",
                "476015555",
                "476015575",
                "476015595",
                "476015605",
                "476015615",
                "507741365"
            ],
            "id": "687005635"
        }
      }...
```

**Bad Request**
Status: 400 Bad Request

### Create Mavenlink Task

**Request**
POST /tasks/mavenlink/create

Body `JSON` parameters: 
Any of the parameters specified in the Mavenlink documentation for Stories


**Successful Response**
Status: 200 OK

**Bad Request**
Status: 400 Bad Request

### Edit Mavenlink Task

**Request**
PUT /tasks/mavenlink/update

Query parameters:
- id: the Mavenlink task id

Body `JSON` parameters: 
Any of the parameters specified in the Mavenlink documentation for Stories

**Successful Response**
Status: 200 OK

**Bad Request**
Status: 400 Bad Request

### Delete Mavenlink Task

**Request**
DELETE /tasks/mavenlink/delete

Query parameters:
- id: the Mavenlink task id

**Successful Response**
Status: 204 No Content

**Bad Request**
Status: 400 Bad Request


### Get Mavenlink Time Entries

**Request**
GET /tasks/time

Query parameters:
Any of the query parameters specified in the Mavenlink documentation for Time Entries

**Successful Response**
Status: 200 OK

**Bad Request**
Status: 400 Bad Request


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
