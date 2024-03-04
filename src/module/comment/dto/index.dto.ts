import { IsString , isInt ,ValidateNested  } from "class-validator";

export class CreateCommentDto {
    @IsString()
    text: string;

    @IsString()
    user: string;
}
