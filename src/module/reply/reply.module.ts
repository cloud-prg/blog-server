import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Reply } from "./reply.entity";
import { Comment } from "@/module/comment/comment.entity";
import { ReplyController } from "./reply.controller";
import { ReplyService } from "./reply.service";

@Module({
    imports: [TypeOrmModule.forFeature([Comment,Reply])],
    controllers: [ReplyController],
    providers: [ReplyService],
})

export class  ReplyModule {}
