import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraDeployerComponent } from './infra-deployer.component';

describe('InfraDeployerComponent', () => {
  let component: InfraDeployerComponent;
  let fixture: ComponentFixture<InfraDeployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraDeployerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfraDeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
