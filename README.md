# SEB server GUI in JS (POC)

Development repository for accessibility PoC of new JavaScript based SEB Server GUI.

**Prerequisites for development machine:**

* `git` is installed
* `docker` (and `docker-compose`) is installed
* Clone this repo: `git clone git@github.com:SafeExamBrowser/seb-server-jsgui.git`

## Setup SEB Server webservice with Open API documentation integration
1. Navigate to the webservice directory: `cd docker/webservice` (this contains a prepared docker-compose setup to start
   the SEB Server webservice including an integrated mariadb)
2. Create a `.env` file and define the required passwords (one for the webservice, one for the database) Example:
   `SEBSERVER_PWD=somePW\nDB_SA_PWD=someOtherPW`
3. Run `docker-compose up -d`. This will fetch the latest version (`1.2-latest`) of the images and start the containers.
   The service will be available on `localhost:8090` and the Swagger / OpenAPI will run on
   `http://localhost:8090/swagger-ui/index.html`. By default, you just see a dummy project. Put `/v3/api-docs`
   into the top bar and click on `Explore` to see the relevant API docs
4. Check if everything is ok with `docker logs seb-webservice`
5. Check the logs for admin user and password (they will be automatically generated when the service is started up with
   an empty database)
6. In Swagger, you can click on `Authorize` and fill both the credentials of your user (that you got from the logs) and
   the basic Auth credentials (that you set in the `.env` file). You now have an access token and can play with the API.

## Setup current RAP GUI service

This is not required, but can help understand how the current application works.

1. `cd docker/guiservice/rap`
2. Create a `.env` file and define the required passwords (only the one for the webservice is required, but it must
   match the one defined in the webservice above.
3. `docker-compose up -d`
4. The GUI runs on `localhost:8080/` where you can login with the user and password the webservice generated
6. Check logs: `docker logs seb-server-rapgui`
