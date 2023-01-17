import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from 'src/app/modules/todo/interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoWidgetComponent implements OnInit {

  public title = ''
  public todoList$!: Observable<ITodo[]>;
  public loading$!: Observable<boolean>;

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.todoList$ = this.todoService.entities$
    this.loading$ = this.todoService.loading$
    this.todoService.getAll()
  }

  onCreate() {
    if (this.title) {
      this.todoService.add(this.title)
      this.title = ''
    }
  }

  onRemove(id: number) {
    this.todoService.remove(id)
  }

  onComplete(todo: ITodo) {
    this.todoService.toggleCompleted(todo)
  }
}
