import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';

interface HelloRequest {
    name: string;
}

interface HelloReply {
    message: string;
}

interface GreeterService {
    sayHello(request: HelloRequest): Promise<HelloReply>;
}

@Controller('greeter')
export class GreeterController {
    private greeterService: GreeterService;

    constructor(@Inject('GREET_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.greeterService = this.client.getService<GreeterService>('Greeter');
    }

    @Post("sayhello")
    async sayHello(@Body() data: HelloRequest): Promise<HelloReply> {
        return await this.greeterService.sayHello(data);
    }
}
