## Ease Off Bills
Got lots of Bills and can't remember which one to pay? Just add your bills and app will remember those bills for you. You will know what's due, when it's due and the money you have to put towards it. On top, it will also allow you to see spending on how much you are spending towards each category. Users will have access to delete and edit those bills. There are also great resources on bills. User will have access to categorize due bills and articles.

## Technologies Used
* HTML
* JavaScript
* Bootstrap
* React
* Axios
* Firebase
* CRUD
* Webpack
* Sass

## Screen shots
coming soon....
1. Login Page
![mainview](./screenshots/)

2. Main Page
![mainview](./screenshots/)

3. Spending Page
![mainview](./screenshots/)

## How to Run this Project

[Live Demo](https://ease-off-bills-3e50f.firebaseapp.com/)

- Setup Firebase
  - Create a firebase project
  - Enable Google Authentication and Facebook Authentication
  - Create a Firebase Realtime Database. import !base.json and you will see data for articles and bills
  - Click on Articles, and the import the articles.json file. Complete same step for bills.
  - Go to Database tab and click on Rules tab, and add the following rule:
     ``` "bills": {
        ".indexOn":"uid"
      },```

- Clone the repository
- Change it to repository directory in your terminal
- At the root of the project run ``npm install`` to install necessary dependencies
- Create an apiKeys.js file (refer to apiKeys.js.example for an example)
- do `npm start` to run the project at ``http://localhost:3000``