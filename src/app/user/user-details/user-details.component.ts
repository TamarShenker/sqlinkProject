import {Component, OnInit} from '@angular/core';
import {UserStoreRepository} from "../user.store";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userSubject$ = this.userStoreRepository.getUser();

  constructor(private userStoreRepository: UserStoreRepository) {
  }

  ngOnInit(): void {
  }
}

