import { HttpResponse } from "../models/Common/HttpResponse";
import { SampleResponseEntity } from "../models/ResponseEntities/SampleResponseEntity";

const paymentsServices: any = {};

paymentsServices.sampleService = async (message: string): Promise<HttpResponse<SampleResponseEntity>> => {
    return {
        status: 200,
        result: {
            message: message
        }
    }
}

export default paymentsServices;