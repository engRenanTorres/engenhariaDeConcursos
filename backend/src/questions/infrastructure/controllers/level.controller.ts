import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LevelService } from "../../application/services/level.service";
import { CreateLevelDto } from "../../application/dto/create-level.dto";
import { UpdateLevelDto } from "../../application/dto/update-level.dto";
import { ApiBearerAuth, ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../../../common/decorators/roles.decorator";
import { Role } from "../../../users/entities/role.enum";

@ApiTags("Level")
@Controller("api/level")
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  findAll() {
    return this.levelService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.levelService.findById(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  update(@Param("id") id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("jwt")
  @Roles(Role.ADM, Role.STAFF)
  @ApiForbiddenResponse({ description: "Access denied." })
  remove(@Param("id") id: string) {
    return this.levelService.remove(+id);
  }
}
