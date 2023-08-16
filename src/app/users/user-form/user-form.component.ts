import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromUsers from '../../store/user';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup
  userId: number | null = null;
  user$!: Observable<IUser | undefined>;
  users$!: Observable<IUser[]>;
  isLoading$!: Observable<boolean>;
  maxDate: Date = new Date()
  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initUserForm();
    this.extractUserIdFromRoute();
  }

  private initUserForm(): void {
    this.userForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/),
        Validators.maxLength(20),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/),
        Validators.maxLength(20),
      ]],
      birthdate: ['', [Validators.required]],
      isActive: [true]
    });
  }

  get form() {
    return this.userForm.controls;
  }

  private extractUserIdFromRoute(): void {
    this.route.params.subscribe(params => {
      const id = +params['userId'];
      if (!isNaN(id)) {
        this.userId = id;
        this.store.dispatch(fromUsers.getUsers()); // Fetch all users initially
        this.user$ = this.store.select(fromUsers.getUser(this.userId));
        this.patchFormWithUserData()
      }
    });
  }

  private patchFormWithUserData(): void {
    // Find the user from the store based on userId
    this.user$.subscribe((res: IUser | undefined) => {
      if (res)
        this.userForm.patchValue(res)
    })
  }

  submitUserForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
      return;
    }
    if (!this.userId) {
      this.store.dispatch(fromUsers.createUser({
        user: {
          id: Date.now(),
          ...this.userForm.value,
        }
      }));
    } else {
      this.store.dispatch(fromUsers.updateUser({
        user: {
          id: this.userId,
          ...this.userForm.value
        }
      }));
    }
  }

  back() {
    this.location.back()
  }

}
