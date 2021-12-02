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

## Technical information

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

### Test environment

There is a [test server](https://seb.test-swissmooc.ch/sms) that can be used as an API end point when deploying to a
Vercel test / staging environment. The test server includes both the GUI and the API webservice. This is a simplified
setup with some caveats: 1. The API redirects to the GUI if it receives an incorrect request. 2. Don't delete users
here, as other people are using this service for testing

### Tech stack

* Language: [TypeScript](https://www.typescriptlang.org/). Most Vue components are still written in vanilla JavaScript,
  but they should be migrated to TypeScript in the future.
* JavaScript framework: [Vue3](https://v3.vuejs.org/)
* Routing: [Vue Router v3](https://router.vuejs.org/)
* CSS: [TailwindCSS](https://tailwindcss.com/) with [PostCSS](https://postcss.org/) and
  [SCSS](https://sass-lang.com/)
* Accessible components: mostly custom developed, with some [HeadlessUI](https://headlessui.dev/) sprinkled in
* Icons: [Heroicons](https://heroicons.dev/)

### Miscellaneous information

* This is a [single-page application](https://developer.mozilla.org/docs/Glossary/SPA)
* This uses Vue3's [composition API](https://v3.vuejs.org/api/composition-api.html)
* Authentication state is stored in [Local Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
* To get familiar with the code, probably the best is to start with `main.js` / `App.vue` and follow the dependency tree
* The Java code for both the webservice and the current GUI is available on
  [Github](https://github.com/SafeExamBrowser/seb-server)

## Features

* Accessibility: the overall architecture of the application has been reviewed by an accessibility expert. The
  application has been tested on NVDA on Windows, VoiceOver for Mac, VoiceOver for iOS and TalkBack on Android.
* Filtering: filter selection by different field types (text, boolean), show current filters, adapt/remove current
  filters
* Sorting: inline sorting in table headers, general sorting in actions (a11y: on Desktop, this is used on keyboard
  navigation only), alphabetical sorting ASC & DSC
* Inline actions: dropdown for all actions concerning a single table entry
* General actions: actions concerning multiple table enties
* Multiselect / Bulk actions (turn on feature by adding `?multiselect` to the URL): possibility to select/deselect each
  single table entry, helper menu to select/deselect many entries at once. The bulk actions themselves are just dummies.
* Show / Hide columns: in the POC, the additional columns have just dummy content. This means that sorting has no
  effect, because the API doesn't know about them.
* Paging: go the next, previous, first, last page
* Mobile ready and responsive, basic PWA functionality
* Application navigation and routing
* CRUD institutions: forms for creating new institutions and editing existing ones. Viewing one or many institutions.
* Authentication / Permissions
* Simplistic design, ready for theming (to adapt the theme, change the primary color in `tailwind.config.js`)

## Decisions

* Changing page and adapting sorting keeps the current selection, while filtering resets it. This is probably what the
  user expects. Also, it avoids logical problems, where a selected item might not be in the current table anymore (
  because of updated filter criteria).
* Inline sorting buttons are read as part of the row description on NVDA. We couldn't find a way to make it not do this,
  without hiding the inline sorting buttons altogether. As this is an important feature, we decided to live with this
  tradeoff for NVDA.
* Bulk actions: as bulk actions will be very different from case to case, we decided to now just show a generic alert
  message when a bulk action is triggered. Instead of this, we imagine that bulk actions would then allow for further
  settings in a Modal. Depending on the case, the modal might just display a confirmation button and a list of items,
  that would be affected by the bulk action.
* For ease of development and a quick start, we decided to mirror the application
  to [this](https://github.com/elHornair/seb-release) GitHub repository, so we can use the free and automatic CI/CD
  features of Vercel. This is not a long term solution (Vercel should be connected to the original GitHub repo, which
  will require a [Vercel license](https://vercel.com/pricing), costing 20 USD / month). When the CI/CD setup is moved to
  an internal server, Vercel will not be needed anymore.
* Security: storing the authentication token in the browsers Local Storage might or might not have unwanted security
  implications. For the POC we decided to accept that. For a production application, this should be looked into further.
* For a good mobile experience, it was important for the main actions to be sticky (meaning that they shouldn't scroll,
  when the main content is scrolling). Because the three sticky elements (main header, table actions, table caption) are
  situated in three different contexts, it was quite tricky to make the application behave that way. Make sure you fully
  understand how it works, before attempting to change any of it. See `Institutions.vue` for further information.
* Screen reader noise vs. information: the order of the table actions (`aside`) and the table itself (`main`) is
  inverted with CSS. The reason for this is that we want the actions to visually appear before the table. For a11y
  reasons however, we want them to appear logically (that is in the DOM) after the table itself, because the table is
  the important content, and we don't want screen reader / keyboard users to have to go through all table actions before
  reaching the table. As a consequence of that, one can't directly tab to the table form the table actions (even though
  the optics indicate that). We discussed the possibility to add a hidden link "go to main content" after the table
  actions, but refrained from it for now, because this creates more "noise" for screen readers. Keep in mind, that power
  users can reach the main content via landmarks, headings and the skip link shortcuts at any time. The dilemma between
  having "too much noise" for power users and "not enough information" for less experience users appeared in many cases
  throughout the POC. We tried to find a fair balance, by deciding on a case by case basis. An example of "the noisy
  way" is the inline actions menu: here we added more information, because it's crucial for less experienced users to
  know that the menu targets this particular row. Power users that know this already can interrupt the screen reader and
  move on to the next element or open the menu right away.

## Sources

**General:**

* https://www.accessibility-developer-guide.com/
* https://developer.mozilla.org/en-US/docs/Web/Accessibility
* https://www.a11ymatters.com/
* https://www.a11y-101.com/
* https://www.digitala11y.com/wcag-checklist/

**Accessible tables**:

* https://adrianroselli.com/2017/11/a-responsive-accessible-table.html
* https://www.a11y-101.com/development/tables
* https://adrianroselli.com/2021/04/sortable-table-columns.html
* https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html

## Possible future improvements

As this project was a timeboxed proof of concept, it is by definition incomplete. There are several optimisations and
features that could / should be done in the future. This is an incomplete list of them:

* Alerts / confirmations: nice alert box instead of system dialog (currently used for warnings in edit forms,
  deactivating of institutions, ...). Something like the Modal.
* Implement example bulk action: Modal with list of all currently selected items. Possibility to adapt selection.
  Possibility to select further settings for this particular bulk action. Confirm / cancel button.
* Migrate all Vue components from vanilla JavaScript to TypeScript. Basic TypeScript setup is done, and all JavaScript
  files (e.g. composables) have been migrated to TypeScript. However, most Vue components haven't been migrated to
  TypeScript yet. This should be done. See `App.vue` for an example of a Vue component written in TypeScript.
* Paging: add dropdown "show x elements per page". Or maybe wo could just make this more than 10 by default.
* A11y: focus styling could be adapted, so it generates more attention (currently we use the same styling as the
  Edu-App)
* Empty state / loading animation: while loading data from the API (e.g. when sorting / filtering / paging), there is a
  delay. During this, we should give the user an optical feedback, so it's clear that something is happening. If there
  are no results, this should be indicated more clearly, both visually and with good text for screen readers.
* Auto logout / refresh: when authentication token expires (after 12h), the user should be automatically redirected
  to `/login`. Currently nothing happens (i.e. the application is blocked) and the user needs to manually reload or
  navigate to the login page.
* Config (GET parameter for demonstration purpose): show action buttons as normal links on mobile+ screens
* Config (GET parameter for demonstration purpose): set theming, so interactive elements are shown in different colours
* Safe settings (sorting / filtering / paging / visible column) in Local Storage. Currently, the settings are lost upon
  a hard reload or a logout
* Prepare for E2E testing: set distinct data attributes on DOM elements
* Current SEB server feature: realtime monitoring (probably as an aria live region)
* Current SEB server feature: exam configuration (complex, dynamic form with several tabs)
* Current SEB server feature: date picker / date time picker form control
* Current SEB server feature: color picker form control
* Current SEB server feature: collection form control
* Use translation mechanism (currently all texts are hardcoded in English)
* Error logging service (Edu-App uses Sentry)

### Related to interaction design

* Custom design / using ETH corporate design
* Currently, the application has a max width of 1280px. This ensures, that the content doesn't infinitely scale up,
  making it hard to read on big screens. On the other hand, the tables will scroll horizontally if there is a lot of
  content, which is not ideal. This should be considered when designing the applications main layout.
* Improve vertically scrolling tables: sticky header column? Fadeout overlay? Inline actions always visible? Keep in
  mind, that the rows of the table have a variable height, making absolutely positioning row elements tricky. Making the
  columns one-line only is advised against, because we would have to cut the text of long table cells which is very bad
  for the users, because they can't read the whole content.
* Further design improvements on mobile (e.g. spacings)
* Print styles (Ctrl + P / save as PDF): make sure that contents (e.g. a list of institutions) are displayed correctly

## Credits

* For the implementation of the responsive grid, Adrian
  Roselli's [article](https://adrianroselli.com/2017/11/a-responsive-accessible-table.html) was an extremely valuable
  and inspiring source.
* The Gmail web client was very helpful as an inspiration for dealing with multiselect functionality.

## Contact

This project was developed by [me](https://www.alainhorner.ch/). Contact me on my website if you need help or have any
further questions.