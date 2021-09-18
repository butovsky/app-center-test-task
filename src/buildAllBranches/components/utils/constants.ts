interface requestConstantsInterface {
    errorUltimateMessage: string,
    getBranchesReq: string,
    checkBuildReq: string
    startBuildReq: string
    createMessageReq: string,
    retryTimeout: number,
    retryAttempts: number,
};

export const requestConstants: requestConstantsInterface = {
    errorUltimateMessage: "Error can't be resolved after all the retries. Please fix it in order to make script work probably.",
    getBranchesReq: 'Get All Branches',
    checkBuildReq: 'Check Build Status',
    startBuildReq: 'Start Build',
    createMessageReq: 'Create Build Success/Error Message',
    retryTimeout: 3000,
    retryAttempts: 3,
};