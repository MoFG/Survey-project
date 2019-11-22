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
  surveyDetails;

  constructor(private userService: UserService, private router: Router, private surveyListService: SurveyListService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    )
    this.refreshSurveyList();
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

  onSurveyId(surveyList: SurveyList) {
    this.surveyListService.selectedSurveyItem = surveyList;
    console.log(surveyList);
    this.userDetails = !this.userDetails;
    
    this.surveyListService.getSurveyId(surveyList).subscribe(
      res => {
        this.surveyListService.selectedSurveyItem.questions = res['questions'];       
        console.log(this.surveyListService.selectedSurveyItem.questions);
         
      }
    )
  }
}
