import { GetBranches } from './components/getBranches';
import { StartBuild } from './components/startBuild';
import { CheckBuild } from './components/checkBuild';

export class BuildAllBranches {
    private static interval: number = 10000; 
    private static timers: Array<NodeJS.Timeout> = [];
    private static branchObjects: Array<any>;
    
    static async execute(): Promise<void> {
        this.branchObjects = await GetBranches.execute();
        for (let index in this.branchObjects) {
            await StartBuild.execute(this.branchObjects[index].branch.name).catch(err => console.log(err));
            this.timers.push(setInterval(async() => await CheckBuild.execute(this.branchObjects[index].branch.name, this.timers[index]), this.interval));
        };
    };
};

export default BuildAllBranches;