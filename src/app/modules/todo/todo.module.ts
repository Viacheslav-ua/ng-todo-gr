import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodoWidgetComponent } from './widgets/todo-widget/todo-widget.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    TodoWidgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    TodoWidgetComponent
  ]
})
export class TodoModule { }
