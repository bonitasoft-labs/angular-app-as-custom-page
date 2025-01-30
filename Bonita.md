# How to import a Angular Application as a Bonita Custom Page


## Bonita update needed

We need to remove the `browser` folder in `dist` to be allow to serve the application.
Do do it, in `angular.json`, replace in  `architect > build > options`:
``` json
  "outputPath": "dist/my-angular-app",
```
with 
``` json
"outputPath": {
  "base": "dist/resources",
  "browser": "",
  "media": "assets"
  }
```

## Add a page.properties

In a `resources` folder, create a `page.properties` file and add this content (you need to update each entry to feat yours needs).

```
name=custompage_myAngularApp
displayName=Angular App example
descritpion=This page is developed in Angular; it can be exported to an IDE to be edited, but not in Bonita UI Designedescription.
resources=[]
contentType=page
```

More details on this [official documentation page](https://documentation.bonitasoft.com/bonita/latest/pages-and-forms/pages-development)

## Create a custom page bundle

After run the `npm run build` command. You can execute the `scripts/createCustomePage.js` script.

It will:
* Retrieve the `name` specify in `package.json`
* Copy `page.properties` to ``dist` folder
* Create a `zip` which contains the `dist` folder in a `customPage` folder


> [!TIP]
> To test if the dist folder is compatible with a Bonita custom page, you can try to run **npx http-server dist/resources** (adapt the dist/resources path depending of where to execute the command line)

## Import the page in Bonita

Go in the `admin application` in `resources` tab.

Import the custom page generated on previous section

Map this page to an application

Open the application and you will see your angular page application