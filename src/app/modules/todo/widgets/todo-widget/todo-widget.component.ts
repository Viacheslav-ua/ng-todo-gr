import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITodo } from 'src/app/todo';
import { BACKEND_BASE_DOMAIN } from 'src/env';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoWidgetComponent implements OnInit {

  public title = ''
  public todoList!: ITodo[]
  private length = this.todoList?.length

  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    console.log('DoInit');
    this.httpClient.get<ITodo[]>(BACKEND_BASE_DOMAIN + 'todo')
      .subscribe(todoList => {
        this.todoList = todoList
        this.cdr.markForCheck()
      })
  }

  onCreate() {
    if (this.title) {
      this.httpClient.post<ITodo>(
        BACKEND_BASE_DOMAIN + 'todo',
        { title: this.title }
      )
        .subscribe({
          next: todo => this.todoList.push(todo),
          complete: () => {
            this.title = ''
            this.cdr.markForCheck()
           },
        })
    }
  }

  onRemove(id: number) {
    this.httpClient.delete<void>(BACKEND_BASE_DOMAIN + 'todo/' + id)
      .subscribe(
        () => this.todoList = this.todoList.filter(todo => todo.id !== id), null, () => this.cdr.markForCheck()
      )
  }

  onComplete(todo: ITodo) {
    this.httpClient.patch<ITodo>(
    BACKEND_BASE_DOMAIN + 'todo/' + todo.id,
      { isCompleted: !todo.isCompleted }
    )
      .subscribe((updatedTodo) => {
        this.todoList = this.todoList.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo)
    }, null, () => this.cdr.markForCheck())

  }
}
