import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = [
    {
      id: 1001,
      firstName: 'Michael',
      lastName: 'Johnson',
      birthdate: '1992-07-25',
      isActive: true
    },
    {
      id: 1002,
      firstName: 'Emily',
      lastName: 'Williams',
      birthdate: '1988-12-15',
      isActive: false
    },
    {
      id: 1003,
      firstName: 'David',
      lastName: 'Smith',
      birthdate: '1995-04-03',
      isActive: true
    },
    {
      id: 1004,
      firstName: 'Sophia',
      lastName: 'Jones',
      birthdate: '1990-09-20',
      isActive: false
    },
    {
      id: 1005,
      firstName: 'Ethan',
      lastName: 'Brown',
      birthdate: '1987-06-08',
      isActive: true
    },
    {
      id: 1006,
      firstName: 'Olivia',
      lastName: 'Davis',
      birthdate: '1994-03-12',
      isActive: false
    },
    {
      id: 1007,
      firstName: 'James',
      lastName: 'Miller',
      birthdate: '1998-11-02',
      isActive: true
    },
    {
      id: 1008,
      firstName: 'Ava',
      lastName: 'Wilson',
      birthdate: '1989-02-18',
      isActive: false
    },
    {
      id: 1009,
      firstName: 'William',
      lastName: 'Taylor',
      birthdate: '1993-10-27',
      isActive: true
    },
    {
      id: 1010,
      firstName: 'Emma',
      lastName: 'Anderson',
      birthdate: '1991-05-14',
      isActive: false
    },
  ];


  getUsers(): Observable<IUser[]> {
    return of(this.users); // Simulating an asynchronous operation with 'of' operator
  }

  getUser(id: number): Observable<IUser | undefined> {
    return of(this.users.find(user => user.id === id));
  }

  createUser(user: IUser): Observable<IUser> {
    this.users = [
      ...this.users,
      user
    ];

    return of(user);
  }

  updateUser(updateUser: IUser): Observable<IUser> {
    this.users = this.users.map(user => user.id === updateUser.id ? updateUser : user);
    return of(updateUser);
  }

  deleteUser(user: IUser): Observable<IUser> {
    this.users = this.users.filter(b => b.id !== user.id);
    return of(user);
  }
}