import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import { NetWorthCategory, NetWorthData, NetWorthRecord } from './interfaces';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createOrUpdateRecord(data: NetWorthRecord, section: string): NetWorthData {
    const rawData = fs.readFileSync('src/data.json', 'utf8');
    const netWorthData: NetWorthData = JSON.parse(rawData);
    const categoryIndex = netWorthData[section].findIndex(
      (category) => category.id === data.categoryId,
    );
    if (!netWorthData[section][categoryIndex]) {
      throw new HttpException('Invalid Category ID', HttpStatus.BAD_REQUEST);
    }
    if (!netWorthData[section][categoryIndex].records) {
      netWorthData[section][categoryIndex].records = [];
    }
    const recordIndex = netWorthData[section][categoryIndex].records.findIndex(
      (record) => record.id === data.id,
    );
    if (recordIndex < 0) {
      netWorthData[section][categoryIndex].records.push({
        ...data,
        id: netWorthData[section][categoryIndex].records.length + 1,
      });
    } else {
      netWorthData[section][categoryIndex].records[recordIndex] = data;
    }
    fs.writeFileSync('src/data.json', JSON.stringify(netWorthData, null, 2));
    return netWorthData;
  }

  createOrUpdateCategory(
    data: NetWorthCategory,
    section: string,
  ): NetWorthData {
    const rawData = fs.readFileSync('src/data.json', 'utf8');
    const netWorthData: NetWorthData = JSON.parse(rawData);
    const categoryIndex = netWorthData[section].findIndex(
      (category) => category.id === data.id,
    );
    if (categoryIndex < 0) {
      netWorthData[section].push({
        id: netWorthData[section].length + 1,
        records: [],
        ...data,
      });
    } else {
      netWorthData[section][categoryIndex] = data;
    }
    fs.writeFileSync('src/data.json', JSON.stringify(netWorthData, null, 2));
    return netWorthData;
  }
}
