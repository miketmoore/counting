# Counting App

This is a simple React app that talks to a server which is a reverse proxy to a 3rd party "count API".
You'll need to create a free API key via the documentation here: https://countapi.xyz/.

## Clone

```
git clone git@github.com:miketmoore/counting.git
cd counting
```

## Run

Install docker and run the following command:

```
COUNTING_API_KEY="your-countapi-key" docker-compose up -d
```

This command will serve the application to http://localhost:3000

## Cleanup

Stop and remove the docker containers

```
docker-compose stop
docker-compose rm -f
```
