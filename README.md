# SEB server GUI in JS (POC)

## Project setup

Development repository for accessibility PoC of new JavaScript based SEB Server GUI.

**Prerequisites for development machine:**

* Install `git`
* Install `docker` (and `docker-compose`)
* Install `nvm` ([Node Version Manager](https://github.com/nvm-sh/nvm))
* Clone this repo: `git clone git@github.com:SafeExamBrowser/seb-server-jsgui.git` (`nvm` will virtually install the
  correct version of `Node.js` for you)

### Setup SEB Server webservice with Open API documentation integration

1. Navigate to the webservice directory: `cd docker/webservice` (this contains a prepared docker-compose setup to start
   the SEB Server webservice including an integrated mariadb)
2. Create a `.env` file and define the required passwords (one for the webservice, one for the database) Example:
   `SEBSERVER_PWD=somePW\nDB_SA_PWD=someOtherPW` (`SEBSERVER_PWD` will be used for HTTP basic Auth)
3. Run `docker-compose up -d`. This will fetch the latest version (`1.2-latest`) of the images and start the containers.
   The service will be available on `localhost:8090` and the Swagger / OpenAPI will run on
   `http://localhost:8090/swagger-ui/index.html`. By default, you just see a dummy project. Put `/v3/api-docs`
   into the top bar and click on `Explore` to see the relevant API docs
4. Check if everything is ok with `docker logs seb-webservice`
5. Check the logs for admin user and password (they will be automatically generated when the service is started up with
   an empty database)
6. In Swagger, you can click on `Authorize` and fill both the credentials of your user (that you got from the logs) and
   the basic Auth credentials (user: `guiClient`, password that you set in the `.env` file). You now have an access
   token and can play with the API.

### Setup current RAP GUI service

This is not required, but can help understand how the current application works.

1. `cd docker/guiservice/rap`
2. Create a `.env` file and define the required passwords (only the one for the webservice is required, but it must
   match the one defined in the webservice above.
3. `docker-compose up -d`
4. The GUI runs on `localhost:8080/` where you can login with the user and password the webservice generated
5. Check logs: `docker logs seb-server-rapgui`

### Setup POC GUI

1. Set virtual node environment: `nvm use`
2. Install dependencies: `npm install`
3. Setup env variables: `cp .env.dist .env` and adapt the variables in `.env` according to your needs
4. Compile and minify for production: `npm run build` (all required files will be saved in `/dist`)

* For development *
* Compile for development (with hot-reloading): `npm run serve` (the CLI tells you on what port the application runs)
* Linting: `npm run lint`
* Configure your editor so it respects and autofixes the rules defined in `.eslintrc.js`

## General useful information

* There is a [test server](https://seb.test-swissmooc.ch/sms) that can be used as an API end point when deploying to a
  Vercel test / staging environment. The test server includes both the GUI and the API webservice. This is a simplified
  setup with some caveats: 1. The API redirects to the GUI if it receives an incorrect request. 2. Don't delete users
  here, as other people are using this service for testing
* The Java code for both the webservice and the current GUI is available on
  [Github](https://github.com/SafeExamBrowser/seb-server)

## Deployment

The project is optimized to be deployed to Vercel. If Vercel is connected, deployments will automatically run on each
push.

Currently, [this](https://github.com/elHornair/seb-release) repo is connected to Vercel. The main branch is continuously
deployed to
[this](TODO) URL. If you want to connect your own Repo to Vercel, you can do the following:

* Go to [Vercel](https://vercel.com/)
* Create a new project and connect it to your Github repo.
* Fill in the questions that are asked during setup.
* Configure the environment variables that are defined in `.env.dist` in the Vercel user interface. You will probably
  use `https://seb.test-swissmooc.ch` as the endpoint.

If you want to run the Vercel setup (including the serverless functions) locally for debugging purposes,
run `npm run vercel`. You will have to answer some questions regarding config like the Github repo to use etc.
