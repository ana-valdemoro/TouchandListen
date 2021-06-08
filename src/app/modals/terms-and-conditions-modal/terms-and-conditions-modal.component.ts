import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html',
  styleUrls: ['./terms-and-conditions-modal.component.scss'],
})
export class TermsAndConditionsModal implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,) { 
      this.form = this.formBuilder.group({
        terms: new FormControl(false, Validators.requiredTrue),
        policy: new FormControl(false, Validators.requiredTrue),
      })
    }

  ngOnInit() {}
  
  accept(){
    console.log("He aceptado");
  }
  onSubmit(){
    console.log(this.form.value);
  }
  onSelectionChange(e, controlName) {
    if(controlName == "terms"){
      let termsControl = this.form.get("terms");
      termsControl.setValue(!termsControl.value);
    }else{
      let policyControl = this.form.get("policy");
      policyControl.setValue(!policyControl.value);
    }
   
    // const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
    // this.CHECK_LIST[i].checked = e.target.checked;
    // this.updateCheckControl(checkboxArrayList, e.target);


  }
}
