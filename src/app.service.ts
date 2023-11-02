import { Injectable } from '@nestjs/common';
import { ReqBody } from './app.controller';
import { v4 as uuid } from 'uuid';

export type CachedData = {
  [key: string]: {
    id: number;
    name: string;
    uid: string;
  };
};

// eslint-disable-next-line prefer-const
let cache: CachedData = {};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Vikas!';
  }

  /**
   * We are recieving the data and assigning the unique id to the payload
   * then using the same id as key to store it in cache variable. Hence we can use this
   * unique id to GET the desired data
   * @param req
   * @returns {status: 'OK', data: res}
   */

  setData(req: ReqBody): any {
    const uid = uuid();
    const res = {
      id: req.int,
      name: req.stringValue,
      uid,
    };
    cache[uid] = res;

    console.log(cache);

    return { status: 'OK', data: res };
  }
  /**
   * GET Data by Unique Id
   * @param id
   * @returns response payload {id: name: uid:}
   */
  getDataById(id: string): any {
    const result = cache[id];
    console.log('heklo');
    if (result) return result;
    return { message: 'No data found' };
  }

  getData(): any {
    const res = cache;
    console.log(cache);
    if (res) return res;
    return { message: 'No data found' };
  }
}
