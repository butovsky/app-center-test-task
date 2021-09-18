import { FetchAPI } from "./utils/fetchAPI";
import { requestConstants } from './utils/constants';

export class StartBuild {
    static async execute(
        branchName: string,
        retryCount: number = 1,
    ): Promise<void> {
        console.log('Build in queue: ' + branchName);
        await (new FetchAPI).execute({
            method: 'POST',
            req: requestConstants.startBuildReq,
            branchName: branchName,
        })
        .catch(err => {
            console.log(err);
            if (retryCount <= requestConstants.retryAttempts) {
                console.log('Retry attempt: ' + retryCount + ' of ' + requestConstants.retryAttempts);
                setTimeout(() => this.execute(branchName, retryCount + 1), requestConstants.retryTimeout);
            } else {
                console.log (requestConstants.errorUltimateMessage);
            };
        });
    };
};

export default StartBuild;