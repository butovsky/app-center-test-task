import { FetchAPI } from "./utils/fetchAPI";
import { requestConstants } from './utils/constants';

export class GetBranches {
    private static branchData: Promise<Array<any>>;

    static async execute(
        retryCount: number = 1,
    ): Promise<any[]> {
        await (new FetchAPI).execute({
            method: 'GET',
            req: requestConstants.getBranchesReq
        })
        .then(res => res.json())
        .then(data => 
            {
                if (data?.statusCode >= 400) {
                    throw new Error('Unknown error (HTTP code 4xx/5xx) occured on fetch. Please check your credentials and API workability');
                }
                this.branchData = data;
            }
        )
        .catch(err => {
            console.log(err);
            if (retryCount <= requestConstants.retryAttempts) {
                console.log('Retry attempt: ' + retryCount + ' of ' + requestConstants.retryAttempts);
                setTimeout(() => this.execute(retryCount + 1), requestConstants.retryTimeout);
            } else {
                console.log (requestConstants.errorUltimateMessage);
            };
        });
        return this.branchData;
    };
};
export default GetBranches;