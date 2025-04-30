# SpaceToStudy-Client

<a href="https://softserve.academy/"><img src="./spacetostudy-thumbnail.jpg" title="SoftServe IT Academy" alt="SoftServe IT Academy"></a>

# SpaceToStudy project

SpaceToStudy project is a platform where experts in various fields share their knowledge and students can learn from the best. Here you can find the proper training course, find a tutor, or find students and receive feedback from them.

[![GitHub issues](https://github.com/ita-social-projects/SpaceToStudy-Client/issues)]
[![Pending Pull-Requests](https://github.com/ita-social-projects/SpaceToStudy-Client/pulls)]
[![GitHub license](insert your link here)]

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
- [Contributing](#contributing)
  - [git flow](#git-flow)
  - [issue flow](#git-flow)
- [Teams](#teams)
  - [Development team](#development-team)
  - [DevOps team](#devops-team)
  - [Designer team](#designer-team)
- [FAQ](#faq)
- [License](#license)

---

## Installation

- All the `code` required to get started

### Required to install

- NodeJS (18.14.0 LTS)

### Clone

- Clone this repo to your local machine

### Setup

> install npm packages

```shell
$ npm install
```

### How to run local

1. Open terminal.
2. Run `npm run start` to start application.<sup>[\*](#footnote)</sup>
3. Open http://localhost:3000 to view it in the browser.

###### <a name="footnote">\*</a> - to run the project you need an `.env` file in root folder

## Usage

### How to run tests

To run unit test open terminal and run `npm run test` in it.

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

## Contributing

You're encouraged to contribute to our project if you've found any issues or missing functionality that you would want to see. You can add in **Issues** tab and after that click on `New issue`. There you can see the list of issues and create a new issue after clicking on `New Issue`.

Before sending any pull request, please discuss requirements/changes to be implemented using an existing issue or by creating a new one. All pull requests should be done into `develop` branch.

There are three GitHub projects: **SpaceToStudy-Client** for frontend part, **SpaceToStudy-BackEnd** for backend part and **SpaceToStudy-Packages** for our design system. Every project has it's own issues.

Every pull request should be linked to an issue. So if you make changes on frontend or backend parts you should create an issue with a link to corresponding requirement (story, task or epic). Every issue should have its own branch. Every branch name should start from task type (`feature`, `bugfix` or `test`), task number and short description. e.g. **feature/125/create-adminPanel**

All Pull Requests should start from prefix `#xxx-yyy` where xxx - task number and and yyy - short description e.g. **#125-createAdminPanel**

---

### Git flow

We have **main** , **develop** and **feature** branches.  
All **feature** branches must be merged into `develop` branch!!!
Only the release should merge into the main branch!!!

![Github flow](<https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=1312>)

#### Step 1

- **Option 1**

  - 👯 clone this repo to your local machine

- **Option 2**

  - create new branch from development branch

#### Step 2

- add some commits to your new branch

#### Step 3

- 🔃 create a new pull request in this repository

---

### Issue flow

#### Step 1

- go to **Issues** and click `New issue` button

#### Step 2

- when creating issue you should add name of the issue, description, choose assignee, label, project. If issue is a `User Story` you should link it with corresponding tasks, and corresponding tasks should be linked to issue.

#### Step 3

- if issue is in work it should be placed in proper column on dashboard according to its status.

---

## Teams

### Development team

[![@Mav-Ivan](https://avatars.githubusercontent.com/u/110425368?v=4)](https://github.com/Mav-Ivan)
[![@Mike-Popovych](https://avatars.githubusercontent.com/u/125293578?v=4)](https://github.com/Mike-Popovych)
[![@VKormylo](https://avatars.githubusercontent.com/u/65959529?v=4)](https://github.com/VKormylo)
[![@nebby2105](https://avatars.githubusercontent.com/u/154923065?v=4)](https://github.com/nebby2105)
[![@SofiiaYevush](https://avatars.githubusercontent.com/u/142519729?v=4)](https://github.com/SofiiaYevush)
[![@ArtemHolikov](https://avatars.githubusercontent.com/u/102384883?v=4)](https://github.com/ArtemHolikov)
[![@yur4uwe](https://avatars.githubusercontent.com/u/157615455?v=4)](https://github.com/yur4uwe)
[![@uliaescha](https://avatars.githubusercontent.com/u/136600464?v=4)](https://github.com/uliaescha)
[![@Iarynovskyi](https://avatars.githubusercontent.com/u/164883382?v=4)](https://github.com/Iarynovskyi)
[![@danikua](https://avatars.githubusercontent.com/u/115005047?v=4)](https://github.com/danikua)
[![@lizabre](https://avatars.githubusercontent.com/u/108484546?v=4)](https://github.com/lizabre)
[![@oleg191006](https://avatars.githubusercontent.com/u/156513251?v=4)](https://github.com/oleg191006)
[![@TARDeus524](https://avatars.githubusercontent.com/u/142096148?v=4)](https://github.com/TARDeus524)
[![@IrynaKhylchuk](https://avatars.githubusercontent.com/u/141860021?v=4)](https://github.com/IrynaKhylchuk)
[![@luvthenika](https://avatars.githubusercontent.com/u/124041223?v=4)](https://github.com/luvthenika)
[![@irynalaitaruk](https://avatars.githubusercontent.com/u/30904237?v=4)](https://github.com/irynalaitaruk)

### DevOps team

[![@qwqw-333](https://avatars.githubusercontent.com/u/132368159?v=4)](https://github.com/qwqw-333)

### Designer team

[![@Nastia197](https://avatars.githubusercontent.com/u/76164279?v=4)](https://github.com/Nastia197)
[![@a-humanenko](https://avatars.githubusercontent.com/u/192996565?v=4)](https://github.com/a-humanenko)

---

## FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just do this.

---

#### License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.

[MIT](https://choosealicense.com/licenses/mit/)

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
