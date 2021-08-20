# Solution

## Clone git repo

```
git clone git@github.com:miketmoore/counting.git
cd counting
```

## Run via docker

```
docker build . -t miketmoore/counting
docker run -p 3001:3001 -d miketmoore/counting
```

## Test server via curl

This should return a response body like `{"count":46011}`

```
curl -i localhost:3001/api/count/get
```
