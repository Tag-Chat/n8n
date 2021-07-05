import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeExecutionData,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../../transport';

export async function getByEmail(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const email = this.getNodeParameter('email', index) as string;
	
	const qs = {} as IDataObject;
	const requestMethod = 'GET';
	const endpoint = `users/email/${email}`;
	const body = {} as IDataObject;

	const returnData: IDataObject[] = [];
	const responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);

	if (Array.isArray(responseData)) {
		returnData.push.apply(returnData, responseData);
	} else {
		returnData.push(responseData);
	}

	return this.helpers.returnJsonArray(returnData);
}