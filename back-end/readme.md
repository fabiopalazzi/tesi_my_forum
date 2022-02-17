# Back-end

My back-end project is realized using MySQL 8 as relation db and node js to model logic and request from front-end. I’m also using docker engine to build my back-end environment locally and then deploy to cloud.

I’ve also used a npm (node package manager) to manage all dependencies. My node backend uses express library to build a simple http server that accepts HTTP request like GET, POST, PUT, DELETE, in a link specified, to manage data stored in db. Front-end will push some request to backend when it will try for example to register use, search post, comment post...

To build environment locally:

<aside>
1️⃣ Install Docker Engine (if it hasn’t already installed): instruction on [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

</aside>

<aside>
2️⃣ Run docker-compose up in root of project: backend environment will be so initialized

</aside>