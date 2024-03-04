import { Controller, Post, Param, Body, Response, Request } from "@nestjs/common";
import { CreateReplyDto } from "./dto/index.dto";
import { ReplyService } from './reply.service'

@Controller('reply')
export class ReplyController {
  constructor(private readonly ReplyService: ReplyService) { }

  @Post('/create/:paperId/:commentId')
  async create(
    @Param('commentId') commentId: string,
    @Param('paperId') paperId: string,
    @Body() createReplyDto: CreateReplyDto,
    @Response() res,
    @Request() req
  ) {
    this.ReplyService.create(commentId, createReplyDto);

    const origin = req.get('origin')
    const redirectUrl = origin + `/paper/?id=${paperId}`;
    res.redirect(redirectUrl);
  }
}
