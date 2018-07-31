import * as AngularCore from '@angular/core'
import * as AngularHttp from '@angular/http'
import { CONFIG, IConfig } from './config';
import { MyProvider } from './myProvider';

@AngularCore.NgModule({
	id: 'myGTModule',
	imports: [
		AngularHttp.HttpModule,
	],
	schemas: [
		AngularCore.CUSTOM_ELEMENTS_SCHEMA
	]
})
export class myModule {
	public static forRoot(config: IConfig): AngularCore.ModuleWithProviders {
		return <AngularCore.ModuleWithProviders>{
			ngModule: myModule,
			providers: [
				{ provide: CONFIG, useValue: config },
				MyProvider
			]
		}
	}
}
