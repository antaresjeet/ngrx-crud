import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs/operators';

import * as fromUsers from './index';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private router: Router
  ) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.getUsers.type),
      switchMap(() => this.userService.getUsers()),
      map((users: IUser[]) => fromUsers.getUsersSuccess({ users }))
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.createUser),
      switchMap(({ user }) => this.userService.createUser(user)),
      map((user: IUser) => fromUsers.createUserSuccess({ user })),
      tap(() => this.router.navigateByUrl('/'))
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.updateUser),
      switchMap(({ user }) => this.userService.updateUser(user)),
      map((user: IUser) => fromUsers.updateUserSuccess({ user })),
      tap(() => this.router.navigateByUrl('/'))
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUsers.deleteUser),
      switchMap(({ user }) => this.userService.deleteUser(user)),
      map((user: IUser) => fromUsers.deleteUserSuccess({ user }))
    )
  );
}
