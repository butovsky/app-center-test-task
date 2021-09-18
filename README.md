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
 
 ## Exception handling and retry logic
 
```
Error: Unknown error (HTTP code 4xx/5xx) occured on fetch. Please check your credentials and API workability
    at /home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:15:23
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Function.execute (/home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:8:9)
Retry attempt: 2 of 3

Error: Unknown error (HTTP code 4xx/5xx) occured on fetch. Please check your credentials and API workability
    at /home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:15:23
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Function.execute (/home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:8:9)
Retry attempt: 3 of 3

Error: Unknown error (HTTP code 4xx/5xx) occured on fetch. Please check your credentials and API workability
    at /home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:15:23
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Function.execute (/home/haseldev/consoleApp/dist/buildAllBranches/components/getBranches.js:8:9)
Error can't be resolved after all the retries. Please fix it in order to make script work probably.
```
 
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
### Automated testing
