import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service';
import { SurveyListService } from '../shared/survey-list.service';
import { SurveyList } from '../shared/survey-list.model';

declare var M: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  isOpen: boolean;

  constructor(private userService: UserService, private router: Router, private surveyListService: SurveyListService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    )
    this.refreshSurveyList();
    this.surveyListService.selectedSurveyItem = {
      _id: "",
      personId: "",
      questions: [],
      description: {},
      startDate: "",
      endDate: "",
      isOpen: null
    }
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm) {
    this.surveyListService.createNewSurveyItem(form.value).subscribe((res) => {
      console.log(res);
      M.toast({html: 'Saved successfully', classes: 'rounded'});
    })
  }

  refreshSurveyList() {
    this.surveyListService.getSurveyList().subscribe((res) => {
      this.surveyListService.surveyLists = res as SurveyList[];
    })
  }

  onSurveyTable(surveyItem: SurveyList) {
    this.router.navigate[('/surveytable')];
    this.userDetails = !this.userDetails;
  }
}
