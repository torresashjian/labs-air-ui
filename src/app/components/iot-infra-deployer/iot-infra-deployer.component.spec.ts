import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotInfraDeployerComponent } from './iot-infra-deployer.component';

describe('IotInfraDeployerComponent', () => {
  let component: IotInfraDeployerComponent;
  let fixture: ComponentFixture<IotInfraDeployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotInfraDeployerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotInfraDeployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
