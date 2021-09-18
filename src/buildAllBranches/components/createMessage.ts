import { FetchAPI } from "./utils/fetchAPI";
import { requestConstants } from './utils/constants';

export class CreateMessage {
    private static startTime: number;
    private static finishTime: number;
    private static buildTime: number;
    
    static async execute(
        buildData: any,
        branchName: string,
        result: string,
        retryCount: number = 1
    ): Promise<void> {
        this.startTime = new Date(buildData.startTime).getTime();
        this.finishTime = new Date(buildData.finishTime).getTime();
        this.buildTime = (this.finishTime - this.startTime) / 1000;

        await (new FetchAPI).execute({
            method: 'GET',
            req: requestConstants.createMessageReq,
            buildID: buildData.id
        })
        .then(res => res.json())
        .then(logs => {
            if (!logs || !logs.uri) {
                throw new Error('Build concluded (' + branchName + ': ' + result + '), but no logs for this build yet');
            }
            if (result === 'succeeded') {
                console.log('Build succeeded: ' + branchName + '\n Logs: ' + logs.uri + '\n Build time: ' + this.buildTime + ' seconds');
            } else {
                console.log('Build failed: ' + branchName + '\n Logs: ' + logs.uri);
            };
        })
        .catch(err => {
            console.log(err);
            if (retryCount <= requestConstants.retryAttempts) {
                console.log('Retry attempt: ' + retryCount + ' of ' + requestConstants.retryAttempts);
                setTimeout(() => this.execute(buildData, branchName, result, retryCount + 1), requestConstants.retryTimeout);
            } else {
                console.log (requestConstants.errorUltimateMessage);
            };
        });
    };
};

export default CreateMessage;