## Mini Project
A small project that stores, retrieves, and displays a value from Redis.

There are three components to this project, the Redis container, the Express API, and the Vue.js frontend. 
The express API stores and retrieves a value from Redis when the root URI is accessed. 
Whichever configuration you run (with or without Vue.js frontend), the main site is exposed at http://localhost:9001. 

I've provided compose files to run the application with or without the vue front end. 
### Prerequisites
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Express API only
From this directory, run:

    docker-compose -f docker-compose-express.yml up -d
    
Browse to http://localhost:9001

You can cleanup by removing all containers with :

    docker-compose -f docker-compose-express.yml down

## Vue.js frontend with Express backend
From this directory, run:

    docker-compose -f docker-compose-vue.yml up -d
    
Browse to http://localhost:9001  

You can cleanup by removing all containers with :

    docker-compose -f docker-compose-vue.yml down

Note: You can see the express app running on http://localhost:8080 now. This is now being used
as a REST API to serve the Vue app.
    

## Express API without docker-compose (not recommended)
The requirements specified being able to use `docker run` to start the app. I normally wouldn't use this mechanism
for running multiple containers, preferring docker-compose because of the built in networking it provides. 
However, below you'll find the commands to directly run and network the express API (no Vue.js frontend). 

From this directory run:

    docker network create --driver bridge k_net
    docker build -t k_express -f express/Dockerfile express/
    docker run -d -p 6379:6379 --net=k_net --name mini_redis redis:6.0.6
    REDIS_HOST=`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mini_redis`
    docker run -p 9001:8080 --net=k_net -e REDIS_HOST=$REDIS_HOST --name mini_web -itd k_express
    
Browse to http://localhost:9001

You can clean up with:

    docker kill mini_redis mini_web
    docker rm mini_redis mini_web
    docker rmi k_express
    docker network remove k_net