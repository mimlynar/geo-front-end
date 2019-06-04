import {NgModule} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material";

@NgModule({
  exports: [
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,

  ],
  providers: [{provide: MatDialogRef, useValue: {}}]

})
export class CustomMaterialModule {
}
