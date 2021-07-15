import { SplashComponent } from '../../routes/splash/splash.component';
import { HomeComponent } from '../../routes/home/home.component';
import {IotGatewayEndpointComponent} from '../../components/iot-gateway-endpoint/iot-gateway-endpoint.component';
import { IotGatewayComponent } from 'src/app/components/iot-gateway/iot-gateway.component';
import { IotGatewayDetailsComponent } from 'src/app/components/iot-gateway-details/iot-gateway-details.component';
import { IotPipelineComponent } from 'src/app/components/iot-pipeline/iot-pipeline.component';
import { IotDataPipelineComponent } from 'src/app/components/iot-data-pipeline/iot-data-pipeline.component';
import { IotEdgeDataPipelineComponent } from 'src/app/components/iot-edge-data-pipeline/iot-edge-data-pipeline.component';
import { IotGatewayDashboardComponent } from 'src/app/components/iot-gateway-dashboard/iot-gateway-dashboard.component';
import { ActivatedRouteSnapshot, NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import { Gateway } from 'src/app/shared/models/iot.model';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { IotInfraDeployerComponent } from 'src/app/components/iot-infra-deployer/iot-infra-deployer.component';

export const HOME_ROUTE = 'splash';
let router:Router;
let params: Observable<Params>;
let snapshot: ActivatedRouteSnapshot;
let route: ActivatedRoute;
export const STARTER_APP_ROUTES=
[
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'gateway',
        component: IotGatewayComponent,
        data: { breadcrumb: ['Gateways'] }
      },
      {
        path: 'gatewayendpoint/:gatewayId',
        component: IotGatewayEndpointComponent,
        data: {breadcrumb: ['Gateways', 'Endpoints']}
        },
      {
        path: 'device-details/:gatewayId',
        component: IotGatewayDetailsComponent,
        data: { breadcrumb: ['Gateways','Devices']}
      },
      {
        path: 'pipeline/:gatewayId',
        component: IotPipelineComponent,
        data: {breadcrumb: ['Gateways', 'Pipelines']}
      },
      {
        path: 'datapipeline/:gatewayId',
        component: IotDataPipelineComponent,
        data: {breadcrumb: ['Gateways']}
      },
      {
        path: 'gatewaydashboard',
        component: IotGatewayDashboardComponent,
        data: {breadcrumb: ['Gateways']}
      },
      {
        path: 'infradeployer',
        component: IotInfraDeployerComponent,
        data: {breadcrumb: ['Gateways']}
      },
      {
        path: 'edgedatapipeline/:gatewayId',
        component: IotEdgeDataPipelineComponent,
        data: {breadcrumb: ['Gateways']}
      }
      
      
    ]
  },
  {
    path: 'splash',
    component: SplashComponent
  }
];