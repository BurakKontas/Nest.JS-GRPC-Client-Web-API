import { Module } from '@nestjs/common';
import { GreeterController } from './greeter.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GREET_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:32769',
          package: 'greet',
          protoPath: "./src/proto/greet/greet.proto",
        },
      },
    ]),
  ],
  controllers: [GreeterController]
})
export class GreeterModule { }
