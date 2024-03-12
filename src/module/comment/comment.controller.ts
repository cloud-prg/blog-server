import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  Request,
  Redirect,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/index.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('test')
  test() {
    return 'test';
  }

  @Post('create/:paperId')
  async create(
    @Param('paperId') paperId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Response() res,
    @Request() req,
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

  @Post('createWithoutRedirect/:paperId')
  async createWithoutRedirect(
    @Param('paperId') paperId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createWithoutRedirect(+paperId, createCommentDto);
  }

  @Get('getAll/:paperId')
  async getAll(@Param('paperId') paperId: number) {
    return this.commentService.getAll(+paperId);
  }

  @Post('delete/:commentId')
  async delete(@Param('commentId') commentId: number) {
    return this.commentService.delete(+commentId);
  }
}
