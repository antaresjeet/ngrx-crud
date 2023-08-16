import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../..//interfaces/user.interface';
import * as fromUsers from '../../store/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$!: Observable<IUser[]>;
  isLoading$!: Observable<boolean>;
  displayedColumns: string[] = ['serial', 'name', 'birthdate', 'isActive', 'actions'];

  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPageIndex: number = 0
  pageSize: number = 10;
  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(pageEvent => {
      this.currentPageIndex = pageEvent.pageIndex;
      this.pageSize = pageEvent.pageSize
    });
  }

  private initDispatch(): void {
    this.store.dispatch(fromUsers.getUsers());
  }

  private initSubscriptions(): void {
    this.users$ = this.store.pipe(select(fromUsers.selectUsersList));
    this.isLoading$ = this.store.pipe(select(fromUsers.selectUserIsLoading));

    this.users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }

  deleteUser(user: IUser): void {
    if (confirm('Are you sure to delete this user?'))
      this.store.dispatch(fromUsers.deleteUser({ user }));
  }

}
