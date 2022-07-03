import { Injectable } from '@angular/core';
import {createStore, select, setProp, withProps} from "@ngneat/elf";
import {UserState} from "./user.state";
import {localStorageStrategy, persistState} from "@ngneat/elf-persist-state";

const userStore = createStore(
  {name: 'user'},
  withProps<UserState>({}));

const persist = persistState(userStore, {
  key: "auth",
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root'
})
export class UserStoreRepository {

   // @ts-ignore
  user$ = userStore.pipe(select((state: { user: any; }) => state.user));


  setUser(user: any) {
    userStore.update((state) => ({
      ...state,
      user: user,
    }));
  }

  getUser() {
    return this.user$;
  }
}
