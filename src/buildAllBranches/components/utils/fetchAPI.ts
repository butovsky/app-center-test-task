import fetch from 'node-fetch';
import { requestConstants } from './constants';

interface FetchInterface {
    method: string;
    req: string;
    branchName?: string;
    buildID?: number;
};

export class FetchAPI {
    private branchName: string;
    private buildID: number;
    private method: string;
    private url: string = `https://api.appcenter.ms/v0.1/apps/${process.env.USER}/${process.env.APP}`;

    async execute({
        method,
        req,
        branchName,
        buildID,
    }: FetchInterface) {
        this.method = method;
        switch (req) {
            case requestConstants.getBranchesReq:
                this.url += `/branches`;
                break;
            case requestConstants.checkBuildReq:
            case requestConstants.startBuildReq:
                this.branchName = branchName;
                this.url += `/branches/${this.branchName}/builds`;
                break;
            case requestConstants.createMessageReq:
                this.buildID = buildID;
                this.url += `/builds/${this.buildID}/downloads/logs`;
                break;
        };
        return await fetch (this.url, {
            method: this.method,
            headers: { 'X-API-TOKEN': process.env.TOKEN}
        });
    };
};

export default FetchAPI;