import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BACKEND_BASE_DOMAIN } from 'src/env';
import { ITodo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public entities$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([])
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public serverError$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  private todoList: ITodo[] = []

  constructor(private httpClient: HttpClient,) { }

  getAll() {
    this.loading$.next(true)
    this.httpClient.get<ITodo[]>(BACKEND_BASE_DOMAIN + 'todo')
      .subscribe(todoList => {
        this.todoList = todoList
        this.entities$.next(this.todoList)
        this.loading$.next(false)
      })
  }

  add(title: string) {
    this.loading$.next(true)
    this.httpClient.post<ITodo>(
        BACKEND_BASE_DOMAIN + 'todo',
        { title }
      )
      .subscribe(todo => {
        this.todoList.push(todo)
        this.entities$.next(this.todoList)
        this.loading$.next(false)
      })
  }

  remove(id: number) {
    this.loading$.next(true)
    this.httpClient.delete<void>(BACKEND_BASE_DOMAIN + 'todo/' + id)
      .subscribe(() => {
        this.todoList = this.todoList.filter(todo => todo.id !== id)
        this.entities$.next(this.todoList)
        this.loading$.next(false)
       }
    )
  }

  toggleCompleted(todo: ITodo) {
    this.loading$.next(true)
    this.httpClient.patch<ITodo>(
    BACKEND_BASE_DOMAIN + 'todo/' + todo.id,
      { isCompleted: !todo.isCompleted }
    )
      .subscribe((updatedTodo) => {
        this.todoList = this.todoList.map(todo => todo.id !== updatedTodo.id ? todo : updatedTodo)
        this.entities$.next(this.todoList)
        this.loading$.next(false)
    })
  }
}
