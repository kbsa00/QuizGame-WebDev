## Webdevelopment and API design Exam 

### About the project
This project is created with Node.js and React.js. The exam said that we were supposed to create Quiz multiplayergame. My game works just how the exam described how the game supposed to work. User 1 starts a game. If there's no current game User 1 will then create one automacially. User 2 press find game. Now that User1 already created a match User 2 will now join this match. Now everybody will wait for User1 to finally start the game. 

##### Quiz Game 
The game is structured with 10 questions and 4 alternative answers. Only one is the correct answer. The user will have 10 seconds to answer each question. The faster you answer the higher points you will get. After the game the scoreboard of the game will present with everyone's username and points

---
### Libraries :book:
Here are some of the important libraries of the solution.
###### Backend
- PassportJS *used for login function*
- Socket io *used for websocket to the client side.*
- rand-token *used for creating matchtokens*
- mongoose *used for connecting and talking to Mongodb*
- bcrypt  *used for hashing of passwords.*
- express *used for creating a nodejs express app*

###### Frontend
- redux-form *used for saving the form state in redux*
- redux *used for storing of app state. ex: userinfortmation*
- react-router *used for routing with react.js*
- redux-thunk *used for async http-request for the action-creators*

---
### Code structure 
This project has to enviorments. Development and Production. That means we are coding we have to take account for both of these enviornments. That means both of these environments are running on different Databases, use different keys etc.   
Here is the folder structure of this project.

![capture](https://user-images.githubusercontent.com/11196323/48793132-4e9fb700-ecf6-11e8-958b-2af16b90707f.PNG)


In the folder of Client is all React.js code. In the root of this project is only Node.js related code. This is how frontend and backend is structured in this project. In this project my intentions was to always to try and split upt code in different files and folders so that anyone that were to read my code wouldn't have big problems finding the information that they need. 

##### HTTP-ROUTES
*Authenticate routes - For functions like Login/logout*
- POST - /api/register - For registering a new user
- POST - /api/login - For login in
- GET - /api/current_user - For retriveing the current user that is logged in.
- GET /api/logout - For logging out of the website.

*Gameroutes - For functions like start a game*
- GET /api/findgame - Checks if there are any current games or will start a new game.
- POST /api/startgame - Will only allow Party-Leader to start the game.
- POST /api/checkgameexist - Will check if the game they started actually exist.
- POST /api/endgame - Will end the game for all of the players.

---
#### How to start project
Do these following actions.
- In the ROOT project do npm install 
```
npm install 
```
- Then procede to client folder and do the same thing.
```
npm install
```
- Go back to the ROOT folder and run the following command
```
cd ..
npm run dev
```

##### Ports
- Server, Nodejs is running on port **3000**
- Client, Reactjs is running on port **8080**

The web app will be presented in localhost:8080
I am using PROXY in order for Server and Web to talk to eachother when doing http-requests. The package.json inside of client is the proxy object if you want to look at it.

---
### Cloud platforms :cloud:
*HEROKU*
- I am hosting this web app on Heroku. **Here is the link of the webapp on heroku:** https://pgr6300.herokuapp.com

*MLab*
- For Database I am using a Cloud Database made by MLab and was just bought by MongoDB. The database is MongoDB and is hosting on AWS. I have made to different databases based on environment. So if you were to create on the page in development environment you will not be able to log in with that account on app on heroku. 

---

### Evaluation
The exam had a list of requirements we had to do. When it comes to the extra requirements I have done all of them except for one. 
-  [x] MongoDB database
-  [x] Redux
-  [x] Heroku
-  [ ] Testing

I've tried my best to make the webpage looking good with css and some bootstrap/materializecss. I really don't have that much experience with css but nevertheless the page is at least ok to look at :) 

### Resources used for this Project
- https://www.youtube.com/watch?v=bxUlKDgpbWs&t=900s Socket IO (Research)
- https://opentdb.com/api_config.php For Quiz Questions. - Questions is from here.
- https://www.udemy.com/react-redux/learn/v4/content Deployment (Research)
