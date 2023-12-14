<a href="https://softserve.academy/"><img src="https://github.com/ita-social-projects/SpaceToStudy-Client/blob/main/photo2.jpg" title="SoftServe IT Academy" alt="SoftServe IT Academy"></a>

# SpaceToStudy project

SpaceToStudy project is a platform where experts in various fields share their knowledge and students can learn from the best. Here you can find the proper training course, find a tutor, or find students and receive feedback from them.


[![GitHub issues](https://img.shields.io/github/issues/ita-social-projects/SpaceToStudy-Client)](https://github.com/ita-social-projects/SpaceToStudy-Client/issues)
[![Pending Pull-Requests](https://img.shields.io/github/issues-pr/ita-social-projects/SpaceToStudy-Client?style=flat-square)](https://github.com/ita-social-projects/SpaceToStudy-Client/pulls)
[![GitHub license](https://img.shields.io/github/license/ita-social-projects/SpaceToStudy-Client)](https://github.com/ita-social-projects/SpaceToStudy-Client/blob/LICENSE)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/horondi/horondi_client_fe)](https://s2s-front-stage.azurewebsites.net/)

---

- [Installation](#installation)
  - [Required to install](#Required-to-install)
  - [Clone](#Clone)
  - [Setup](#Setup)
  - [How to run local](#How-to-run-local)
- [Usage](#Usage)
  - [How to run tests](#How-to-run-tests)
- [Documentation](#Documentation)
  - [Rules and guidelines](#Rules-and-guidelines)
  - [Testing](#Testing)
  - [Generator](#Generator)
- [Project deploy](#project-deploy)
- [Contributing](#contributing)
  - [git flow](#git-flow)
  - [issue flow](#git-flow)
- [Teams](#teams) 
  - [Development team](#development-team) 
  - [DevOps team](#devops-team) 
  - [Designer team](#designer-team)
  - [QC team](#qc-team)
  - [BA team](#ba-team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Installation

- All the `code` required to get started

### Required to install

- NodeJS (18.14.0 LTS)

### Clone

- Clone this repo to your local machine using `https://github.com/ita-social-projects/SpaceToStudy-Client.git`

### Setup

> install npm packages

```shell
$ npm install
```

### How to run local

1. Open terminal.
2. Run `npm run start` to start application.<sup>[*](#footnote)</sup>
3. Open http://localhost:3000 to view it in the browser.

###### <a name="footnote">*</a> - to run the project you need an `.env` file in root folder


## Usage

### How to run tests

To run unit test open terminal and run `npm run test` in it.
To run E2E tests you need open terminal and run `npm run start` in it to start server.
Then open one more terminal and run `npm run cypress`.

---

## Documentation

### Rules and guidelines

- Redux
  - For each entity we should have separate folder
  - In each folder we should have different files for actions, reducer
    `{modelName}.actions.js` or `{modelName}.reducer.js`
- Configuration
  - Configuration is done via `.env` file where environment
    variables are located
  - Also we have `.env.example` that contains examples of environment
    variables
- Styles
  - For styling function `makeStyles` from `@material-ui`
    should be used and all styles should be located inside separate
    component.
- Components
  - Components that are connected to Redux should be located inside
    `containers` folder. Components without connection to Redux should
    be located inside `components` folder.
  - Each individual page that is accessed via `react-router`
    should be located inside `pages` folder. All components
    that are used inside particular page should be located inside
    folder for the specific page.
  - Each component should have at least three files:
    - `index.js` where we export anything from the whole folder
    - `{component-name}.jsx` - file where component is located
    - `{component-name}.styles.js` where all styles are located

### Testing

#### Components

Order of testing components:

1. simple stateless components that are used in multiple places
2. components that depends on other components but not connected to Redux and don’t have any state
3. components that have internal state but are not connected to Redux
4. components that connected to Redux

##### Don’t test:

- third-party libraries
- constants
- static css styles
- related components (test only one specific component at the specific moment of time)
##### How to test:
- testing using snapshots (actual ui)
- testing logic of component (dynamic)

Snapshots allow us to compare actual UI with saved one and throw an error if it has accidentally changed. We can use flag “updateSnapshot” to update save snapshots of a component.
It is appropriate for presentational components but doesn’t cover any logic

##### What to test in components:

- Properties
- default properties
- custom properties
- Data types (use library “jest-extended”)
- Conditions (what if)
- State
- default state
- state after some event has happened
- Events
- with parameters or custom props
- without arguments

#### Sagas

Flow:

- Set up the conditions of our test
- Mock the actual HTTP requests
- Instruct the saga to run through everything and finish its business
- Check that the expected side effects have happened (actions are dispatched, selectors are called, etc)

Link to the full article about proper saga testing: https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib#:~:text=To%20test%20that%20the%20saga,selector%20into%20the%20following%20gen.

#### Actions creators

We test action creators as simple pure functions that just take an arguments and output proper arguments

#### Reducers

We test reducers as simple pure functions that just take an arguments and output proper arguments
Checks:

- valid default state
- changes of state when action is dispatched for different values of state

#### Cypress

1. Use `data-cy` as selector

---

### Generator

Command `npm run generate` is used to run [graphql code generator](https://graphql-code-generator.com)

1. before using codegen you must run backend server [SpaceToStudy backend](https://github.com/ita-social-projects/SpaceToStudy-BackEnd)

2. open terminal

3. run `npm run generate`

4. you should run `npm run generate` every time new unions or interfaces are created

---

## Project Deploy

#### Deploy Сlient part: https://s2s-front-stage.azurewebsites.net/

---

## Contributing

You're encouraged to contribute to our project if you've found any issues or missing functionality that you would want to see. Here you can see [the list of issues](https://github.com/ita-social-projects/SpaceToStudy-Client/issues) and here you can create [a new issue](https://github.com/ita-social-projects/SpaceToStudy-Client/issues/new/choose).

Before sending any pull request, please discuss requirements/changes to be implemented using an existing issue or by creating a new one. All pull requests should be done into `develop` branch.

There are three GitHub projects: [SpaceToStudy-Client](https://github.com/ita-social-projects/SpaceToStudy-Client) for frontend part, [SpaceToStudy-BackEnd](https://github.com/ita-social-projects/SpaceToStudy-BackEnd/pulls) for backend part and admin part is currently under development. Every project has it's own issues.

Every pull request should be linked to an issue. So if you make changes on frontend, backend or admin parts you should create an issue with a link to corresponding requirement (story, task or epic).

All Pull Requests should start from prefix _#xxx-yyy_ where _xxx_ - task number and and _yyy_ - short description
e.g. #020-createAdminPanel

---

### Git flow

We have **main** , **develop** and **feature** branches.  
All **feature** branches must be merged into [develop](https://github.com/ita-social-projects/SpaceToStudy-Client/tree/develop) branch!!!
Only the release should merge into the main branch!!!

![Github flow](<https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=1312>)

#### Step 1

- **Option 1**

  - 👯 Clone this repo to your local machine using `https://github.com/ita-social-projects/SpaceToStudy-Client.git`

- **Option 2**

  - create new branch from development branch

#### Step 2

- add some commits to your new branch

#### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/ita-social-projects/SpaceToStudy-Client/compare/" target="_blank">github.com/ita-social-projects/SpaceToStudy-Client</a>.

---

### Issue flow

#### Step 1

- go to [issues](https://github.com/ita-social-projects/SpaceToStudy-Client/issues) and click `New issue` button

#### Step 2

- when creating [issue](https://github.com/ita-social-projects/SpaceToStudy-Client/issues/new/choose) you should add name of the issue, description, choose assignee, label, project. If issue is a `User Story` you should link it with corresponding tasks, and corresponding tasks should be linked to issue.

#### Step 3

- if issue is in work it should be placed in proper column on dashboard according to its status.

---

## Teams

### Development team

[![@DeLettenhove](https://avatars.githubusercontent.com/u/49168997?v=4)](https://github.com/DeLettenhove)
[![@boris-giga](https://avatars.githubusercontent.com/u/61072426?v=4)](https://github.com/boris-giga)
[![@bohdanst1914](https://avatars.githubusercontent.com/u/27858056?v=4)](https://github.com/bohdanst1914)
[![@domnelkin](https://avatars.githubusercontent.com/u/78971099?v=4)](https://github.com/domnelkin)
[![@RestingState](https://avatars.githubusercontent.com/u/84774115?v=4)](https://github.com/RestingState)
[![@greentoss](https://avatars.githubusercontent.com/u/41526202?v=4)](https://github.com/greentoss)
[![@High-Voltaged](https://avatars.githubusercontent.com/u/71522782?v=4)](https://github.com/High-Voltaged)
[![@Mr-Bogdan](https://avatars.githubusercontent.com/u/62215279?v=4)](https://github.com/Mr-Bogdan)
[![@dmytruk-y](https://avatars.githubusercontent.com/u/86732805?v=4)](https://github.com/dmytruk-y)
[![@Haytham1337](https://avatars.githubusercontent.com/u/36926670?v=4)](https://github.com/Haytham1337)
[![@byavdoshniak](https://avatars.githubusercontent.com/u/87911115?s=200&u=4540d5aba6e388992ca06b9224ed0e0a35f94b1c&v=4)](https://github.com/byavdoshniak)
[![@rostyslaw27](https://avatars.githubusercontent.com/u/57355852?s=200&u=4540d5aba6e388992ca06b9224ed0e0a35f94b1c&v=4)](https://github.com/rostyslaw27)
[![@tarasSanotskyi](https://avatars.githubusercontent.com/u/79531224?s=200&u=4540d5aba6e388992ca06b9224ed0e0a35f94b1c&v=4)](https://github.com/tarasSanotskyi)
[![@LubomyrKashuba](https://avatars.githubusercontent.com/u/80056472?s=200&u=4540d5aba6e388992ca06b9224ed0e0a35f94b1c&v=4)](https://github.com/LubomyrKashuba)
[![@wonderflu](https://avatars.githubusercontent.com/u/86119240?v=4)](https://github.com/wonderflu)
[![@romanortynskyi](https://avatars.githubusercontent.com/u/50491616?s=200&u=4540d5aba6e388992ca06b9224ed0e0a35f94b1c&v=4)](https://github.com/romanortynskyi)
[![@](https://avatars.githubusercontent.com/u/45914032?v=4)](https://github.com/Pipuss)
[![@Tolik170](https://avatars.githubusercontent.com/u/63456632?v=4)](https://github.com/Tolik170)
[![@Yevhendzyuba](https://avatars.githubusercontent.com/u/56231198?v=4)](https://github.com/Yevhendzyuba)
[![@MickhaelSh](https://avatars.githubusercontent.com/u/97129041?v=4)](https://github.com/MickhaelSh)
[![@IrynaMel](https://avatars.githubusercontent.com/u/86352174?v=4)](https://github.com/IrynaMel)
[![@Yurenko](https://avatars.githubusercontent.com/u/83120263?v=4)](https://github.com/Yurenko)
[![@KhrystynaPavlikovska](https://avatars.githubusercontent.com/u/34419998?s=400&u=15346304d164fb346cc2671a7d33052d2a6324e2&v=4)](https://github.com/KhrystynaPavlikovska)
[![@Roman-Peretiatko](https://avatars.githubusercontent.com/u/79856961?v=4)](https://github.com/Roman-Peretiatko)
[![@mxrcury](https://user-images.githubusercontent.com/34419998/222748150-75fae7f1-e219-48f6-a225-8f91f9cbbbd3.png)](https://github.com/mxrcury)
[![@tsivkadi](https://user-images.githubusercontent.com/34419998/222748492-37a29d91-8acc-4319-8402-52ec5fbaa57a.png)](https://github.com/tsivkadi)
[![@Radomyr-kh](https://user-images.githubusercontent.com/34419998/222748801-1112f260-9c96-4234-9e5e-550cddeb80d5.png)](https://github.com/Radomyr-kh)
[![@ArturBekhDEV](https://avatars.githubusercontent.com/u/102412173?v=4)](https://github.com/ArturBekhDEV)
[![@FryDay969](https://avatars.githubusercontent.com/u/39992977?v=4)](https://github.com/FryDay969)
[![@TSlashDreamy](https://avatars.githubusercontent.com/u/45912519?v=4)](https://github.com/TSlashDreamy)
[![@Mav-Ivan](https://avatars.githubusercontent.com/u/110425368?v=4)](https://github.com/Mav-Ivan)
[![@mynotdoing](https://avatars.githubusercontent.com/u/75339353?v=4)](https://github.com/mynotdoing)
[![@dmtrth25](https://avatars.githubusercontent.com/u/56305508?v=4)](https://github.com/dmtrth25)
[![@abalanovsky](https://avatars.githubusercontent.com/u/108689551?v=4)](https://github.com/abalanovsky)
[![@OlyaKorchan](https://avatars.githubusercontent.com/u/17857767?v=4)](https://github.com/OlyaKorchan)
[![@MariaAfonina](https://avatars.githubusercontent.com/u/104988390?v=4)](https://github.com/MariaAfonina)
[![@Marichka0406](https://avatars.githubusercontent.com/u/121502737?v=4)](https://github.com/Marichka0406) 

### DevOps team

[![@redbearddog](https://avatars.githubusercontent.com/u/54843443?v=4)](https://github.com/redbearddog)
[![@abohatyrov](https://avatars.githubusercontent.com/u/52012169?v=4)](https://github.com/abohatyrov)
[![@panasyg](https://avatars.githubusercontent.com/u/91308486?v=4)](https://github.com/panasyg)
[![@bdeputat](https://avatars.githubusercontent.com/u/36072762?v=4)](https://github.com/bdeputat)

### Designer team

[![@philosofii](https://avatars.githubusercontent.com/u/111736765?v=4)](https://github.com/philosofii)
[![@KhrystynaPavlikovska](https://avatars.githubusercontent.com/u/34419998?s=400&u=15346304d164fb346cc2671a7d33052d2a6324e2&v=4)](https://github.com/KhrystynaPavlikovska)
[![@LazyMarichka](https://avatars.githubusercontent.com/u/135900325?v=4)](https://github.com/LazyMarichka)
[![@Nastia197](https://avatars.githubusercontent.com/u/76164279?v=4)](https://github.com/Nastia197)

### BA team
[![@OksanaLS](https://avatars.githubusercontent.com/u/86111111?v=4)](https://github.com/OksanaLS)
[![@dekorol](https://avatars.githubusercontent.com/u/32768738?v=4)](https://github.com/dekorol)
[![@IvannaSW](https://avatars.githubusercontent.com/u/24367409?v=4)](https://github.com/IvannaSW)

### QC team
[![@AntonOkun](https://avatars.githubusercontent.com/u/129941062?v=4)](https://github.com/AntonOkun)
[![@liakhovych1](https://avatars.githubusercontent.com/u/129896611?v=4)](https://github.com/liakhovych1)
[![@qavs](https://avatars.githubusercontent.com/u/153033071?v=4)](https://github.com/qavs)
[![@yevheniyapanchuk](https://avatars.githubusercontent.com/u/130080280?v=4)](https://github.com/yevheniyapanchuk)
[![@Valent1n0o](https://avatars.githubusercontent.com/u/118978192?v=4)](https://github.com/Valent1n0o)
[![@karina-kuu20](https://avatars.githubusercontent.com/u/130448671?v=4)](https://github.com/karina-kuu20)
[![@IrynaCHR](https://avatars.githubusercontent.com/u/130362288?v=4)](https://github.com/IrynaCHR)
[![@MartaMakar](https://avatars.githubusercontent.com/u/130384976?v=4)](https://github.com/MartaMakar)

---

## FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just do this.

---

## Support

---

#### License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.

[MIT](https://choosealicense.com/licenses/mit/)

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
