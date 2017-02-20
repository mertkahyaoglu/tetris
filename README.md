Tetris - [play](http://ec2-35-160-20-129.us-west-2.compute.amazonaws.com/)
------

> Classic tetris game built with MongoDB, Flask and React.js

# How to run locally

## Database

the project uses MongoDB to store highest 10 scores.

- Create mongodb database called `tetris`
- Create `scores` collection
- Run `mongod`

## Server

Run `script/server` script to start Flask server;
- `cd` into `server` folder
- install `pip` dependencies
- and run the `server.py`

## Frontend

Run `script/frontend` script to;
- install `npm` dependencies
- start `dev` server

[MIT](http://opensource.org/licenses/MIT) © [Mert Kahyoağlu](http://mertkahyaoglu.github.io)
