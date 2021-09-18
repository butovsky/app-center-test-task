import { CreateMessage }from "./createMessage";
import { FetchAPI } from "./utils/fetchAPI";
import { requestConstants } from './utils/constants';

export class CheckBuild {
    static async execute(
        branchName: string,
        timer: NodeJS.Timeout,
        retryCount: number = 1,
    ): Promise<void> {
        await (new FetchAPI).execute({
            method: 'GET',
            req: requestConstants.checkBuildReq,
            branchName: branchName,
        })
        .then(res => res.json())
        .then(builds => builds[0])
        .then(async buildData => {
            if (!buildData) {
                throw new Error("Can't find no builds for this branch");
            };
            if (buildData.status === 'completed') {
                clearInterval(timer);
                await CreateMessage.execute(buildData, branchName, buildData.result);
            };
        })
        .catch(err => {
            console.log(err);
            if (retryCount <= requestConstants.retryAttempts) {
                console.log('Retry attempt: ' + retryCount + ' of ' + requestConstants.retryAttempts);
                setTimeout(() => this.execute(branchName, timer, retryCount + 1), requestConstants.retryTimeout);
            } else {
                clearInterval(timer);
                console.log (requestConstants.errorUltimateMessage);
            };
        });
    };
};

export default CheckBuild;