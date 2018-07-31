import { InjectionToken } from '@angular/core';

export const CONFIG = new InjectionToken<IConfig>('config');

export interface IConfig {
	debug: boolean;
}