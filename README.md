## Mini Project
A small project that stores, then displays a value from redis

## Run the express project with docker-compose (recommended)
This runs a (very) small express app that connects to redis, stores a value and immediately retrieves it when
the root route is hit. When run using the following command, it is served at port 9001 (as specified in the requirements).

To run this, from this directory:

    docker-compose -f docker-compose-express.yml up
    
browse to http://localhost:9001

## Run the Vue project with docker-compose (recommended)
This runs a (very) small Vue.js app, leveraging the previous express app as a REST backend. When the Vue.js app
runs, the express app is served at port 8080, and the Vue.js frontend is served at 9001 (as specified in the requirements).

To run this, from this directory:

    docker-compose -f docker-compose-express.yml up
    
browse to http://localhost:9001  
additionally you can see the express app running on http://localhost:8080 now. This is now being used
as a REST API to serve the Vue app.
    


## Run the express project without docker-compose (not recommended)
The requirements specified being able to use `docker run` to start the app. I normally wouldn't use this mechanism, preferring
docker-compose. However, below you'll find the commands to directly run and network the express app (no Vue.js frontend). 

From this directory run:

    docker network create --driver bridge k
    docker build -t k_express -f express/Dockerfile express/
    docker run -d -p 6379:6379 --net=k --name redis redis
    REDIS_HOST=`docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' redis`
    docker run -p 9001:8080 --net=k -e REDIS_HOST=$REDIS_HOST --name web k_express
    
browse to http://localhost:9001

You can clean up with 
    
    docker kill web redis
    docker rm web redis