import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
// import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
// import { FormsModule } from '@angular/forms'
import { TodoModule } from './modules/todo/todo.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // HttpClientModule,
    // FormsModule,
    TodoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
