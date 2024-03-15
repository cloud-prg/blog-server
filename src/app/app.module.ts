import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Paper, PaperModule } from '../module/paper';
import { Reply, ReplyModule } from '../module/reply';
import { Comment, CommentModule } from '../module/comment/';
import { LabelModule } from '@/module/label/label.module';
import { Label } from '@/module/label/label.entity';
import yamlConfig from 'src/config/yamlConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [yamlConfig],
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
        const env = configService.get('env');
        const { database: databaseConfig } = configService.get(env);
        return {
          type: 'mysql',
          ...databaseConfig,
          // entities: [
          //   Paper,
          //   Comment,
          //   Reply,
          //   Label
          // ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
