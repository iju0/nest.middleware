import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { ProfileController } from './profile/profile.controller';
import { GlobalMiddleware } from './global.middleware';

@Module({
  imports: [],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    /// 전역 모듈에 미들웨어 적용
    consumer.apply(GlobalMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    /// 특정 모듈에만 미들웨어를 적용하는 방법
    consumer.apply(LoggerMiddleware).forRoutes(ProfileController);
  }
}
