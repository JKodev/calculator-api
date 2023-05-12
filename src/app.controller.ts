import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { NetWorthCategory, NetWorthData, NetWorthRecord } from './interfaces';

@Controller('net-worth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put(':section/record')
  updateRecords(
    @Body() data: NetWorthRecord,
    @Param('section') section: string,
  ): NetWorthData {
    return this.appService.createOrUpdateRecord(data, section);
  }

  @Put(':section/category')
  updateCategory(
    @Body() data: NetWorthCategory,
    @Param('section') section: string,
  ): NetWorthData {
    return this.appService.createOrUpdateCategory(data, section);
  }
}
