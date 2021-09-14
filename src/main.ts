import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fetch from 'node-fetch';

async function getBranches() {
  const branchData = await fetch(`https://api.appcenter.ms/v0.1/apps/${process.env.USER}/${process.env.APP}/branches`, {
    headers: { 'X-API-TOKEN': process.env.TOKEN }
  });
  return branchData.json();
};

async function startBuild(branchName) {
  console.log('Build in queue: ' + branchName)
  await fetch(`https://api.appcenter.ms/v0.1/apps/${process.env.USER}/${process.env.APP}/branches/${branchName}/builds`, {
    method: 'POST',
    headers: { 'X-API-TOKEN': process.env.TOKEN }
  })
  .catch(err => console.log(err));
};

async function createSuccessMessage(buildData, branchName, result) {
    const startTime = new Date(buildData.startTime).getTime();
    const finishTime = new Date(buildData.finishTime).getTime();
    const buildTime = (finishTime - startTime) / 1000;
    await fetch (`https://api.appcenter.ms/v0.1/apps/${process.env.USER}/${process.env.APP}/builds/${buildData.id}/downloads/logs`, {
      headers: { 'X-API-TOKEN': process.env.TOKEN }
    })
    .then(res => res.json())
    .then(logs => {
      if (result === 'succeeded') {
        console.log('Build succeeded: ' + branchName + '\n Logs: ' + logs.uri + '\n Build time: ' + buildTime + ' seconds');
      } else {
        console.log('Build failed: ' + branchName + '\n Logs: ' + logs.uri);
      }
    })
    .catch(err => console.log(err));
};

async function checkBuild(branchName, timer) {
  await fetch(`https://api.appcenter.ms/v0.1/apps/${process.env.USER}/${process.env.APP}/branches/${branchName}/builds`, {
    headers: { 'X-API-TOKEN': process.env.TOKEN }
  })
  .then(res => res.json())
  .then(builds => builds[0])
  .then(async buildData => {
    if (buildData.status === 'completed') {
      await createSuccessMessage(buildData, branchName, buildData.result);
      clearInterval(timer);
      }
    }
  )
  .catch(err => console.log(err));
};

async function buildAllBranches() {
  for (let branchObject of await getBranches()) {
    await startBuild(branchObject.branch.name);
    const interval = 10000;
    const timer = setInterval(async() => await checkBuild(branchObject.branch.name, timer), interval);
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await buildAllBranches();
  await app.listen(3000);
};

bootstrap();
