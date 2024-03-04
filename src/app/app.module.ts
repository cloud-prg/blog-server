import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { databaseProp } from '../config/configuration';

import { Paper, PaperModule } from '../module/paper';
import { Reply, ReplyModule } from '../module/reply';
import { Comment, CommentModule } from '../module/comment/';
import { LabelModule } from '@/module/label/label.module';
import { Label } from '@/module/label/label.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        PaperModule,
        CommentModule,
        ReplyModule,
        LabelModule
      ],
      useFactory: (configService: ConfigService) => {
        const databaseConfig: databaseProp = configService.get('database');
        return {
          type: 'mysql',
          ...databaseConfig,
          // entities: [
          //   Paper,
          //   Comment,
          //   Reply,
          //   Label
          // ],
          autoLoadEntities: true,
          synchronize: true,
          // logging: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
