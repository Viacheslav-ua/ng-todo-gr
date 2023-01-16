import { ChangeDetectionStrategy, Component, OnInit, DoCheck } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ITodo } from './todo';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, DoCheck {

  public title = ''
  public todoList!: ITodo[]
  private length = this.todoList?.length

  constructor(
    private httpClient: HttpClient,
    private cdr: ChangeDetectorRef,
  ) { }



  ngOnInit(): void {
    console.log('ngDoInit');
    this.httpClient.get<ITodo[]>('http://localhost:3000/rest/todo')
      .subscribe(todoList => {
        this.todoList = todoList
      })
  }

   ngDoCheck(): void {
    console.log('ngDoCheck');
    if (this.todoList?.length !== this.length) {
      console.log('HAS CHANGED')
      this.cdr.markForCheck()
      this.length = this.todoList.length
    }
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
    }, null, () => this.cdr.markForCheck())

  }
}
