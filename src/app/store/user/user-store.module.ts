import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './user.effects';
import { userReducer } from './user.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('user', userReducer),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserStoreModule { }
