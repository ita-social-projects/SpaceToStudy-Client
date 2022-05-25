<<<<<<< HEAD
# SpaceToStudy-Client
=======
# ITA Project

Description should be here.

## Project structure

<ul>
    <li>App-Folder
        <ul>
            <li>
             /src - project source code folder
                <ul>
                    <li>
                        /assets - for assets ('.svg', '.ico'...)
                    </li>
                    <li>
                        /components - for shared basic components
                    </li>
                    <li>
                        /constants - for general constants
                    </li>
                    <li>
                        /containers - for complex components
                    </li>
                    <li>
                        /pages - for project pages
                    </li>
                    <li>
                        /plugins - for plugins
                    </li>
                    <li>
                        /styles - for general styles and style variables
                    </li>
                </ul>
            </li>
            <li>
                /test - project tests folder
                <ul>
                    <li>
                        /coverage - coverage store
                    </li>
                    <li>
                        /unit - unit tests, should duplicate project structure
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

#### Components

Folder for basic shared project components. Like inputs, forms, buttons, table grids, loaders etc. Components should be stateless. 

#### Containers

Folder for more complex project components. Example: Container for rendering list of items, with sorting filtering etc. Containers should also be stateless.

#### Pages

Folder for project pages. The page should manage it state, work with requests for BE, and pass props to containers and components.

## Code conventions

#### Before any pull request, you have to make sure you tested your component and components your work could affect. Test your component with Unit tests. SELF-TESTING and good quality of unit tests may guaranty the success of the application.

#### Code style

The project has installed and configured ES Lint and Prettier. All rules are set, you can learn them in .eslintrc.json file.

#### Coding rules

<ul>
    <li>
        Components and containers should not be deep nested. If so separate them into a couple of components.</li>
    <li>
        JSX should not include complex logic (If else statements, handlers functions, etc.).</li>
    <li>
        If a component or page has complex long logic statements, it should be separated or moved to a custom hook.</li>
    <li>
        If the logic in components has been repeated it should be moved to custom hooks.
    </li>
    <li>
        Components should be covered with unit tests. Coverage limit set for 80%. Pre push hooks are configured.
    </li>
    <li>
        General CSS styles should be placed in the styles folder. Values that are repeated should be moved to CSS variables.
    </li>
</ul>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
>>>>>>> 09c68ddc8324fdf96163c9f118aed3520d4f7d2c
