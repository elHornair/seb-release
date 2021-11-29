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
[this](https://seb-release.vercel.app/) URL. If you want to connect your own Repo to Vercel, you can do the following:

* Go to [Vercel](https://vercel.com/)
* Create a new project and connect it to your Github repo.
* Fill in the questions that are asked during setup.
* Configure the environment variables that are defined in `.env.dist` in the Vercel user interface. You will probably
  use `https://seb.test-swissmooc.ch` as the endpoint.

If you want to run the Vercel setup (including the serverless functions) locally for debugging purposes,
run `npm run vercel`. You will have to answer some questions regarding config like the Github repo to use etc.

## Features

* Accessibility: the overall architecture of the application has been reviewed by an accessibility expert. The
  application has been tested on NVDA on windows, VoiceOver for Mac, VoiceOver for iOS and TalkBack on Android.
* Filtering: filter selection by different field types (text, boolean), show current filters, adapt/remove current
  filters
* Sorting: inline sorting in table headers, general sorting in actions, alphabetical sorting ASC & DSC
* Inline actions: dropdown for all actions concerning a single table entry
* General actions: actions concerning multiple table enties
* Multiselect / Bulk actions (turn on feature by adding `?multiselect` to the URL): possibility to select/deselect each
  single table entry, helper menu to select/deselect many entries at once.
* Paging: go the next, previous, first, last page
* Mobile ready and responsive, basic PWA functionality
* Application navigation and routing
* CRUD institutions: forms for creating new institutions and editing existing ones. Viewing one or many institutions.
* Authentication / Permissions
* Simplistic design, ready for theming

## Decisions

* Changing page and adapting sorting keeps the current selection, while filtering resets it. This is probably what the
  user expects. Also it avoids logical problems, where a selected item might not be in the current table anymore (
  because of updated filter criteria).
* Inline sorting buttons are read as part of the row description on NVDA. We couldn't find a way to make it not do this,
  without hiding the inline sorting buttons altogether. As this is an important feature, we decided to live with this
  tradeoff for NVDA.
* Bulk actions: as bulk actions will be very different from case to case, we decided to now just show a generic alert
  message when a bulk action is triggered. Instead of this, we imagine that bulk actions would then allow for further
  settings in a Modal. Depending on the case, the modal might just display a confirmation button and a list of items,
  that would be affected by the bulk action.
* Evtl. ein bisschen Features dokumentieren (bulk-actions exemplarisch -> bedingen entweder bestimmtes muster)
* For ease of development and a quick start, we decided to mirror the application
  to [this](https://github.com/elHornair/seb-release) Github repository, so we can use the free and automatic CI/CD
  features of Vercel. This is not a long term solution (Vercel should be connected to the original Github repo).
* Security: storing the authentication token in the browsers Local Storage might or might not have unwanted security
  implications. For the POC we decided to accept that. For a production application, this should be looked into further.

## Sources

**General:**

* https://www.accessibility-developer-guide.com/
* https://developer.mozilla.org/en-US/docs/Web/Accessibility
* https://www.a11ymatters.com/
* https://www.a11y-101.com/
* https://www.digitala11y.com/wcag-checklist/

**Accessible tables**:

* https://adrianroselli.com/2017/11/a-responsive-accessible-table.html (das war der Wertvollste)
* https://www.a11y-101.com/development/tables
* https://adrianroselli.com/2021/04/sortable-table-columns.html
* https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html

## Possible future improvements

As this project was a time boxed proof of concept, it is by definition incomplete. There are several optimisations and
features that could be done in the future. This is an incomplete list of them:

* TODO

## Contact

This project was developed by [me](https://www.alainhorner.ch/). Contact me on my website if you need help or have any
further questions.