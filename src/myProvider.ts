import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CONFIG } from './config';

export const URL_TEST = "https://www.test-server-url.com";
export const URL_PROD = "https://www.server-url.com";

@Injectable()
export class MyProvider {
	private readonly TAG = "myGTProvider";
	private url = null;
	private envID: number;
	constructor(private http: Http, @Inject(CONFIG) public config) {
		this.url = (config.debug) ? URL_TEST : URL_PROD;
		console.log(this.TAG + ": url -> " + this.url);
	}

	private readonly methods = {
		PING: '/json/Ping',
	}

}
