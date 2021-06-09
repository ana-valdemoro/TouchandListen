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
    this.modalController.dismiss({
      terms: this.form.value.terms,
      policy: this.form.value.policy,
    })
  }
 
  onSelectionChange(e, controlName:string) {
    if(controlName == "terms"){
      let termsControl = this.form.get("terms");
      termsControl.setValue(!termsControl.value);
    }else{
      let policyControl = this.form.get("policy");
      policyControl.setValue(!policyControl.value);
    }
  }
}
