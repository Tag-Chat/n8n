import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';

const rastrojs = require('rastrojs');

export class Correios implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Correios',
        name: 'Correios',
        icon: 'file:correios.svg',
        group: ['output'],
        version: 1,
        description: 'Correios rastreamento',
        defaults: {
            name: 'Correios',
            color: '#1A82e2',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
        ],
        properties: [
            {
                displayName: 'Código Rastreio',
                name: 'codigo',
                type: 'string',
                typeOptions: {
					alwaysOpenEditWindow: true,
				},
                required: true,
                default:'',
                description:'Código de rastreamento da encomenda',
            }
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        let codigo = ''
        for (let i = 0; i < items.length; i++) {
			codigo = this.getNodeParameter('codigo', i) as string;
        }
        const tracks = await rastrojs.track(codigo);
        return [this.helpers.returnJsonArray(tracks)];
    }
}