# Development

## Prerequisites

- Node 14.15.4
- Yarn 1.22.11

## Install

```
git clone git@github.com:miketmoore/counting.git
cd $CLONE_PATH/ui && yarn install
cd $CLONE_PATH/server && yarn install
```

## Run API

```
cd $CLONE_PATH
PORT=3001 node server/index.js
```

Available at http://localhost:3001

## Run UI

```
cd $CLONE_PATH
PORT=3000 yarn start
```

Available at http://localhost:3000

## Note about development proxy

The port configurations in this guide depend on the API port matching what is in the `proxy` section of the `ui/package.json` file. If you want to change the API port from 3001 (as shown above), you'll also need to change it in the "proxy" section.
