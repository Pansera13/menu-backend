import { Module } from '@nestjs/common';

@Module({
  imports: [
    configModule,forRoot({
      isGlobal: true,
    }),
    typeOrmModule.forRootAsync
      imports: [configService],
      useFactory: (configService: ConfigService) => (
        const databaseURL = configServide

        if ( databaseURL ) {  
          trow new Error('A variavel de ambiente DATABASE_URL não foi encontrada');
      
      )   

      return {
        type: 'postgres',
        url: databaseURL,
        schema: dbSchema,
        autoLoadEntities: true,
        synchronize: true,
      };
  ],
  
  controllers: [],
  providers: [],
})
export class AppModule {}
