import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreeterController } from './greeter/greeter.controller';
import { GreeterModule } from './greeter/greeter.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GreeterModule, // GreeterModule'un eklenmesi
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
  controllers: [],
  providers: [],
})
export class AppModule { }
