# Take Home coding task (AppCenter)
Console app (basic TS/Nest implementation) for building all the branches in any App Center app

# What does it show
## Initializing building order
Like so:

```
Build in queue: branch1

Build in queue: branch2

```

etc

## Displaying info about builds in the console

```
Build succeeded: branch1

 Logs: *link*

 Build time: 116.235 seconds


Build failed: branch2

 Logs: *link*
 ```
 etc
 
 # How to set up
 - Clone the repository to your local machine
 - Make sure that NPM and Node.js are installed on your computer:
 ```
 node -v
  npm -v
  ```
  - open project folder in your terminal and enter ```npm i``` to install all the necessary packages
  - copy env.example file and create your own .env file based on it.
  --------------
  #### You need to provide USER (your account' nickname in App Center), APP (name of the app you want to build) and TOKEN (App Center User token OR the App token of the chosen app) variables in order to make script work
  ###### You can test the workability using already provided env variables - one branch always builds successfully, while other is completely empty
  --------------
  - in console, enter ```npm run build ```
  - after building the app - ```npm run start ```

That's it! 

# What can be improved later
### Staging
```
Build in queue: branch1

Build in queue: branch2

Build in progress: branch1

```
### Displaying build time
```
Build time: 1 min 10 sec

```
### Thought-out exception handling
### Automated testing
