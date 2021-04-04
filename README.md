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

2. Install npm packages

```
npm install
```

## Service

1. Access the `service/` directory.

```
cd ~/MavenlinkReportBuilder/service
```

2. Install npm packages

```
npm install
```

# Running the Project

## Client

To use the following scripts, do:

```
npm run <command>
```

List of commands:
- `serve`: Start the application
- `build`: Build the application
- `lint`: Run eslint and let it fix the errors

## Service

To use the following scripts, do:

```
npm run <command>
```

List of commands:
- `start`: Start the application
- `dev`: Start the application with nodemon
- `lint`: Run eslint
- `lint-fix`: Run eslint and let it fix the errors
