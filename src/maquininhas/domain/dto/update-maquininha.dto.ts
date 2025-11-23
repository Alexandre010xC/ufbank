import { PartialType } from "@nestjs/mapped-types";
import { CreateMaquininhaDto } from "./create-maquininha.dto";

export class UpdateMaquininhaDto extends PartialType(CreateMaquininhaDto) {}