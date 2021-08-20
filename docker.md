# Docker Instructions

## Dependencies

- Install docker

## Build image

```
docker build . -t miketmoore/counting
```

## List images

```
docker images
```

## Run container

This maps docker internal port 8080 to host port 49160

```
docker run -p 49160:8080 -d miketmoore/counting
```

## List containers

```
docker ps -a
```
