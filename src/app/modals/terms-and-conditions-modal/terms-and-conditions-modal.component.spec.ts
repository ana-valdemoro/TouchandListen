import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsModal } from './terms-and-conditions-modal.component';

describe('TermsAndConditionsModal', () => {
  let component: TermsAndConditionsModal;
  let fixture: ComponentFixture<TermsAndConditionsModal>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
