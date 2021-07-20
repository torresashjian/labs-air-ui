import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraRegistrationComponent } from './infra-registration.component';

describe('InfraRegistrationComponent', () => {
  let component: InfraRegistrationComponent;
  let fixture: ComponentFixture<InfraRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
