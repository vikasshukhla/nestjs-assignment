import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

export interface ReqBody {
  int: number;
  stringValue: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  setData(@Body() req: ReqBody): any {
    return this.appService.setData(req);
  }

  @Get('data')
  getData() {
    return this.appService.getData();
  }

  @Get(':id')
  getDataById(@Param('id') id: string) {
    return this.appService.getDataById(id);
  }
}
