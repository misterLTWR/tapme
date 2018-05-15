import { NgModule } from '@angular/core';
import { ChatAdminComponent } from './chat-admin/chat-admin';
import { PipesModule } from '../pipes/pipes.module';
// import { AutosizeComponent } from './autosize/autosize';
@NgModule({
	declarations: [ChatAdminComponent,
    ],
	imports: [
		PipesModule
	],
	exports: [ChatAdminComponent,
    ]
})
export class ComponentsModule {}
