# 미들웨어

미들웨어는 nest `Request Lifecycle` 에서 가장 실행되는 함수로서 Request 와 Response 에 대한 관리를 담당한다.

미들웨어 생성할땐 `NestMiddleware` 를 구현해주면 된다.

```tsx
@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
	  next();
  }
}
```

구현된 미들웨어를 적용하기 위해서는 모듈상에 적용하면된다.

```tsx
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {

    // 전역 컨트롤러에 미들웨어 적용
    consumer.apply(GlobalMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    // 특정 컨트롤러에 미들웨어를 적용
    consumer.apply(LoggerMiddleware).forRoutes(ProfileController);
  }
}
```