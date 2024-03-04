import { Body, Controller, Get, Param, Post, Response, Request } from '@nestjs/common';
import { CreateCommentDto } from './dto/index.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('create/:paperId')
  // @Redirect('http://localhost:3000/paper',302)
  async create(
    @Param('paperId') paperId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Response() res,
    @Request() req
  ) {
    this.commentService.create(+paperId, createCommentDto);

    // notice: @Redirect的override并没有生效
    // return {
    //   url: `http://localhost:3000/paper/?id=${paperId}`
    // }

    const origin = req.get('origin');
    const redirectUrl = `${origin}/paper/?id=${+paperId}`
    // 代替方案
    res.redirect(redirectUrl)
  }

  @Get('getAll/:paperId')
  async getAll(@Param('paperId') paperId: number) {
    return this.commentService.getAll(+paperId);
  }
}
