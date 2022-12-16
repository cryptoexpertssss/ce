import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer';
import 'reflect-metadata';

export class Signal {
  @Expose({ name: 'id' }) id: string = '';
  @Expose() symbol: string = '';
  @Expose() entry: number = 0;
  @Expose() stopLoss: number = 0;
  @Expose() takeProfit1: number = 0;
  @Expose() takeProfit2: number = 0;
  @Expose() takeProfit3: number = 0;
  //
  @Expose() isActive: boolean = true;
  @Expose() comment: string = '';
  //
  @Expose() isStopLossHit: boolean = true;
  @Expose() isTakeProfit1Hit: boolean = true;
  @Expose() isTakeProfit2Hit: boolean = true;
  @Expose() isTakeProfit3Hit: boolean = true;
  //
  @Expose() entryType: string = '';
  @Expose() market: string = '';
  @Expose() isFree: boolean = false;
  @Expose() image: string = '';
  @Expose() analysisText: string = '';
  //
  @Expose() @Type(() => Date) entryDate?: Date | null = null;
  @Expose() @Type(() => Date) entryTime?: Date | null = null;
  @Expose() @Type(() => Date) entryDatetime?: Date | null = null;
  //
  @Expose() @Type(() => Date) stopLossDate?: Date | null = null;
  @Expose() @Type(() => Date) stopLossTime?: Date | null = null;
  @Expose() @Type(() => Date) stopLossDatetime?: Date | null = null;
  //
  @Expose() @Type(() => Date) takeProfit1Date?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit1Time?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit1Datetime?: Date | null = null;
  //
  @Expose() @Type(() => Date) takeProfit2Date?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit2Time?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit2Datetime?: Date | null = null;
  //
  @Expose() @Type(() => Date) takeProfit3Date?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit3Time?: Date | null = null;
  @Expose() @Type(() => Date) takeProfit3Datetime?: Date | null = null;
  //
  @Expose() @Type(() => Date) timestampCreated?: Date | null = null;
  @Expose() @Type(() => Date) timestampUpdated?: Date | null = null;

  static fromJson(json: any): Signal {
    return plainToInstance(Signal, json, { exposeDefaultValues: true, excludeExtraneousValues: true });
  }

  static toJson(order: Signal): any {
    return instanceToPlain(order);
  }
}
