# seb-server-jsgui

Development repository for accessibility PoC of new Java-Script based SEB Server GUI.

## Quick setup SEB Server webservice with Open API documentation integration

Prerequisites:
* Git installation on development machine
* docker and docker-compose installation on developer machine

Setup: 
0. Install git and docker/docker-compose on your development machine.
1. Clone this repository to your local development environment
2. Navigate to /docker/webservice/. In you find a prepared docker-compose setup to start the SEB Server webservice plus integrated mariadb database.
3. In this directory create a ".env" file with the needed passwords. You have to give two passwords, one for the SEB Server webservice and one for the database. For example: SEBSERVER_PWD=somePW\nDB_SA_PWD=somePW
4. Use "$ docker-compose build" to fetch the needed images. This can take a while. The SEB Server webservice that is fetched is the newest version 1.2-latest
5. Use "$ docker-compose up -d" to start the SEB Server webservice together with the database. The service will be available on localhost:8090/ and you will find the OpenAPI integration on http://localhost:8090/swagger-ui/index.html
6. Check the log with "$ docker logs seb-webservice" if everithing is okay 
7. On fist time startup (with empty database) the service will automaticall create a admin-user and paste the name and password of this user to the logs. Find them and try to login wihtin the OpenAPI integration

