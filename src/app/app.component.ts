import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ITodo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  public title = ''
  public todoList!: ITodo[]

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<ITodo[]>('http://localhost:3000/rest/todo')
      .subscribe(todoList => {
        this.todoList = todoList
      })
  }

  onCreate() {
    if (this.title) {
      this.httpClient.post<ITodo>(
        'http://localhost:3000/rest/todo',
        { title: this.title }
      )
        .subscribe({
          next: todo => this.todoList.push(todo),
          complete: () => this.title = '',
        })
    }
  }

  onRemove(id: number) {
    this.httpClient.delete<void>('http://localhost:3000/rest/todo/' + id)
      .subscribe(() => this.todoList = this.todoList.filter(todo => todo.id !== id))
  }

  onComplete(todo: ITodo) {
    this.httpClient.patch<ITodo>(
      'http://localhost:3000/rest/todo/' + todo.id,
      { isCompleted: !todo.isCompleted }
    )
      .subscribe((updatedTodo) => {
        this.todoList = this.todoList.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo)
    })

  }
}
