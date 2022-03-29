const express = require('express');
const redis = require("redis");

const app = express();
// host value is container name (name of service in docker-compose.yml). 
// when redis tries to connext to this host from the Docker container.
// docker will see that that's the name of the container and will route the request to that.
// redis client treats the name as just a normal http endpoint.

const redisClient = redis.createClient({
    host: 'redis-server', 
    port: 6379
});

redisClient.set('visits', 0);

app.get('/', (req, res) => {
    redisClient.get('visits', (err, visits) => {
        res.send(`Visits: ${visits}`);
        redisClient.set("visits", parseInt(visits) + 1);
    })
})

app.listen(8080, () => console.log("listening on PORT: 8080"));