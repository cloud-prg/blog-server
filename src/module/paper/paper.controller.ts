import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  ValidationPipe,
  forwardRef,
} from '@nestjs/common';
import { PaperService } from './paper.service';
import {
  CreatePaperDto,
  getPaperListPaginationDto,
  getPaperListPaginationByLabelDto,
  UpdatePaperDto,
} from './dto/index.dto';
import { EntityNotFoundExceptionFilter } from '../../exception/entityException';
import { LabelService } from '../label/label.service';

@Controller('paper')
@UseFilters(EntityNotFoundExceptionFilter)
export class PaperController {
  constructor(
    @Inject(forwardRef(() => PaperService))
    private readonly paperService: PaperService,
    @Inject(forwardRef(() => LabelService))
    private labelService: LabelService,
  ) {}

  @Post('create')
  create(@Body(new ValidationPipe()) createPaperDto: CreatePaperDto) {
    return this.paperService.create(createPaperDto);
  }

  @Post('update')
  update(@Body() updatePaperDto: { paperId: number; data: CreatePaperDto }) {
    const { paperId, data } = updatePaperDto;

    return this.paperService.update(paperId, data);
  }

  @Post('delete/:paperId')
  delete(@Param('paperId') paperId: number) {
    return this.paperService.delete(+paperId);
  }

  @Post('multipleDelete')
  multipleDelete(@Body('paperIds') paperIds: number[]) {
    return this.paperService.multipleDelete(paperIds);
  }

  @Get('getPaper/:paperId')
  getPaper(@Param('paperId') paperId: number) {
    return this.paperService.getPaper(+paperId);
  }

  @Get('getPaperList')
  getPaperList() {
    return this.paperService.getPaperList();
  }

  @Post('getPaperListPagination')
  getPaperListPagination(
    @Body(new ValidationPipe())
    getPaperListPaginationDto: getPaperListPaginationDto,
  ) {
    const { page, pageSize } = getPaperListPaginationDto;
    return this.paperService.getPaperListPagination(page, pageSize);
  }

  @Post('getPaperListPaginationByLabel')
  getPaperListPaginationByLabel(
    @Body()
    params: getPaperListPaginationByLabelDto,
  ) {
    const { page, pageSize, label } = params;
    return this.labelService.getPaperListPaginationByLabel({
      page,
      pageSize,
      label,
    });
  }

  @Post('getLabelsByPaperId/:id')
  getLabelsByPaperId(@Param('paperId') paperId: number) {
    return this.paperService.getLabelsByPaperId(+paperId);
  }

  @Post('deleteLabel/:paperId/:labelId')
  deleteLabel(
    @Param('paperId') paperId: number,
    @Param('labelId') labelId: number,
  ) {
    return this.paperService.deleteLabel(paperId, labelId);
  }

  @Post('getSearchPaperListPagination')
  getSearchPaperListPagination(
    @Body() params: { searchValue: string; page: number; pageSize: number },
  ) {
    return this.paperService.getSearchPaperListPagination(params);
  }
}
