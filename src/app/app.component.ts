import { ChangeDetectionStrategy, Component, OnInit, DoCheck } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ITodo } from './todo';
import { ChangeDetectorRef } from '@angular/core';
import { BACKEND_BASE_DOMAIN } from 'src/env';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
