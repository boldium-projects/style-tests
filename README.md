# Style tests
This makes it easy to test styles on sites just by configuring a json file.

## Installing

1. Clone from github: `git clone git@github.com:boldium-projects/style-tests.git`
2. Install dependencies: `npm install`

## Adding tests

### Add a style.tests.json
Add a file named `style.test.json` to the root of the projects.

### add the schema to the tests json
```
{
    "$schema": "./style.tests.schema.json"
}
```

### Add your first test
Add an array called `tests`, then add an object with:
- a `name` that escribes this collection style tests
- a `url` which is the url you want tested
- and a `viewport` array with 2 numbers, the width and height of our viewport

Example:

```
{
    "$schema": "./style.tests.schema.json",
    "tests": [
        {
            "name": "A scroll bar and it's vestigial website",
            "url": "https://ericmikkelsen.com"
        }
    ]
}
```

### Add some styles to your first test
Now we're going to add an array of objects called styles to our test, where each object has:
- a `selector`, to select an element, only the first element that matches the selector will be tested
- a `description` to describe the element for future reference.
- an array of `rules` that we're going to test on the element

```
{
    "$schema": "./style.tests.schema.json",
    "tests": [
        {
            "description": "A scroll bar, and it's vestigial website"
            "url": "https://ericmikkelsen.com",
            "styles": [
                {
                    "description": "First heading",
                    "selector": "h1",
                    "rules":[
                        {
                            "property": "color",
                            "value":"rgb(0, 0, 0)"
                        },
                        {
                            "property": "display",
                            "value":"block"
                        },
                    ]
                }
            ]

        }
    ]
}
```

## Runing test

1. In the terminal, enter `npm start`
2. Click E2E Testing
3. Click Click Chrome
4. Click style-test.cy.js