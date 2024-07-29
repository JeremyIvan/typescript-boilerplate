import { Request, Response } from 'express';

import samplesServices from '../services/samplesServices'

import { SampleRequestEntity } from '../models/RequestEntities/SampleRequestEntity';

import { HttpResponse } from '../models/Common/HttpResponse';
import { SampleResponseEntity } from '../models/ResponseEntities/SampleResponseEntity';

const samplesController: any = {};

samplesController.sampleFunction = async (request: Request, response: Response) => {
    const {
        message
    }: SampleRequestEntity = request.body;

    const { status, result }: HttpResponse<SampleResponseEntity> = await samplesServices.sampleService(message)

    response.status(status).json(result);
}

export default samplesController;