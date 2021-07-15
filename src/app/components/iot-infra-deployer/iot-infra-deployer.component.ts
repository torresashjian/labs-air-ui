import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { GraphService } from '../../services/graph/graph.service';
import { FlogoDeployService } from '../../services/deployment/flogo-deploy.service';
import { Gateway } from '../../shared/models/iot.model';

export interface SelectItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-iot-infra-deployer',
  templateUrl: './iot-infra-deployer.component.html',
  styleUrls: ['./iot-infra-deployer.component.css']
})
export class IotInfraDeployerComponent implements OnInit {

  // Form variables
  hideAuth = true;
  hideMQTTPass = true;
  deployerForm: FormGroup;

  deployerTypes: SelectItem[] = [
    { value: 'AIR', viewValue: 'AIR Deployer' },
    { value: 'OH', viewValue: 'OpenHorizon' }
  ];

  platformTypes: SelectItem[] = [
    { value: 'linux/amd64', viewValue: 'Linux/AMD64' },
    { value: 'linux/arm64', viewValue: 'linux/ARM64' }
  ];

  constructor(private graphService: GraphService,
    private flogoDeployService: FlogoDeployService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    this.createForm();
  }


  createForm() {

    this.deployerForm = this.formBuilder.group({
      deployerType: ['OH', Validators.required],
      deployEdgex: [true, Validators.required],
      deployAIRBase: [true, Validators.required],
      deployerURL: ['http://54.88.210.184:3090/v1', Validators.required],
      deployConstraints: ['[\"role == RTSF_Demo\"]', Validators.required],
      gatewayId: ['Ubuntu18_IoT', Validators.required],
      gatewayDescription: ['Devices and Sensors for point of sales station', Validators.required],
      gatewayHostname: ['192.168.1.99', Validators.required],
      gatewayRouter: ['http://54.88.210.184:3090/v1', Validators.required],
      gatewayRouterPort: ['22', Validators.required],
      gatewayDeployNetwork: ['loss-detection-app_edgex-network', Validators.required],
      gatewayLatitude: ['33.306340', Validators.required],
      gatewayLongitude: ['-111.934330', Validators.required],
      gatewayAccessToken: ['NONE', Validators.required],
      gatewayUsername: ['admin:NRtypkkV2fO514hZcvVz0Z194AhiPz@myorg', Validators.required],
      gatewayPlatform: ['linux/amd64', Validators.required],
      // gatewayMetadataClient: ['http://edgex-core-metadata:48081', Validators.required],
      gatewayMetadataClient: ['http://localhost:48081', Validators.required],
      gatewayMetadataPublishIntervalSecs: ['30', Validators.required],
      airMqttHosname: ['ab96cf877a138460588b658196b4c430-1973527714.us-west-2.elb.amazonaws.com', Validators.required],
      airMqttPort: ['443', Validators.required],
      airMqttUser: ['mqtt_admin', Validators.required],
      airMqttPassword: ['mqtt_admin', Validators.required],
      airMqttDataTopic: ['EdgexGatewayData', Validators.required],
      airMqttDataMetadataPublisher: ['U18SnapEdgex_IoTEdgexDataMetadataClient', Validators.required],
      edgeMqttHostname: ['localhost', Validators.required],
      edgeMqttPort: ['1883', Validators.required],
      edgeMqttUser: ['', Validators.required],
      edgeMqttPassword: ['', Validators.required],
      edgeMqttDataTopic: ['edgex', Validators.required],
      edgeMqttZmqToMqttPublisher: ['U18SnapEdgex_IoTEdgeZMQToMQTTClient', Validators.required],
    });

  }

  deploy() {

    let deployerType = this.deployerForm.get('deployerType').value;

    let systemEnv = {
      "TargetServer": this.deployerForm.get('deployerURL').value,
      "Username": this.deployerForm.get('gatewayUsername').value,
      "Artifacts": "/home/ubuntu/loss-detection-app",
      "Platform": this.deployerForm.get('gatewayPlatform').value,
      "DeployConstrains": "[\"role == RTSF_Demo\"]",
      "ServiceProperties": "{}",

      "EDGEX_CORE_CONSUL": "localhost",
      "EDGEX_CORE_DATA_HOST": "localhost",
      "EDGEX_SUPPORT_NOTIFICATIONS": "localhost",
      "EDGEX_CORE_METADATA": "localhost",
      "EDGEX_CORE_COMMAND": "localhost",
      "EDGEX_SUPPORT_SCHDELER": "localhost",
      "EDGEX_DEVICE_VIRTUAL": "localhost",
      "EDGEX_REDIS": "localhost",
      "AIR_APP_SERVICE_ZMQ_TO_MQTT": "localhost",
      "AIR_APP_SERVICE_METADATA": "localhost",
      "LABAIR_DEVICE_SIEMENS_SIMULATOR": "localhost",

      // "EDGEX_CORE_CONSUL": "edgex-core-consul",
      // "EDGEX_CORE_DATA_HOST": "edgex-core-data",
      // "EDGEX_SUPPORT_NOTIFICATIONS": "edgex-support-notifications",
      // "EDGEX_CORE_METADATA": "edgex-core-metadata",
      // "EDGEX_CORE_COMMAND": "edgex-core-command",
      // "EDGEX_SUPPORT_SCHDELER": "edgex-support-scheduler",
      // "EDGEX_DEVICE_VIRTUAL": "edgex-device-virtual",
      // "EDGEX_REDIS": "edgex-redis",
      // "AIR_APP_SERVICE_ZMQ_TO_MQTT": "air-app-service-zmq-to-mqtt",
      // "AIR_APP_SERVICE_METADATA": "air-app-service-metadata",
      // "LABAIR_DEVICE_SIEMENS_SIMULATOR": "labsair-device-siemens-simulator",

      "GATEWAY_ID": this.deployerForm.get('gatewayId').value,
      "GATEWAY_DESCRIPTION": this.deployerForm.get('gatewayDescription').value,
      "GATEWAY_HOSTNAME": this.deployerForm.get('gatewayHostname').value,
      "GATEWAY_ROUTER": this.deployerForm.get('gatewayRouter').value,
      "GATEWAY_ROUTER_PORT": this.deployerForm.get('gatewayRouterPort').value,
      "GATEWAY_DEPLOY_NETWORK": "loss-detection-app_edgex-network",
      "GATEWAY_LATITUDE": this.deployerForm.get('gatewayLatitude').value,
      "GATEWAY_LONGITUDE": this.deployerForm.get('gatewayLongitude').value,
      "GATEWAY_ACCESS_TOKEN": "NONE",
      "GATEWAY_USERNAME": this.deployerForm.get('gatewayUsername').value,
      "GATEWAY_PLATFORM": this.deployerForm.get('gatewayPlatform').value,
      "GATEWAY_METADATA_CLIENT": this.deployerForm.get('gatewayMetadataClient').value,
      "GATEWAY_METADATA_PUBLISH_INTERVAL_SECS": this.deployerForm.get('gatewayMetadataPublishIntervalSecs').value,
      "AIR_MQTT_HOSTNAME": this.deployerForm.get('airMqttHosname').value,
      "AIR_MQTT_PORT": this.deployerForm.get('airMqttPort').value,
      "AIR_MQTT_USER": this.deployerForm.get('airMqttUser').value,
      "AIR_MQTT_PASSWORD": this.deployerForm.get('airMqttPassword').value,
      "AIR_MQTT_DATA_TOPIC": this.deployerForm.get('airMqttDataTopic').value,
      "AIR_MQTT_DATA_METADATA_PUBLISHER": this.deployerForm.get('airMqttDataMetadataPublisher').value,
      "EDGE_MQTT_HOSTNAME": this.deployerForm.get('edgeMqttHostname').value,
      "EDGE_MQTT_PORT": this.deployerForm.get('edgeMqttPort').value,
      "EDGE_MQTT_USER": this.deployerForm.get('edgeMqttUser').value,
      "EDGE_MQTT_PASSWORD": this.deployerForm.get('edgeMqttPassword').value,
      "EDGE_MQTT_DATA_TOPIC": this.deployerForm.get('edgeMqttDataTopic').value,
      "EDGE_MQTT_ZMQ_TO_MQTT_PUBLISHER": this.deployerForm.get('edgeMqttZmqToMqttPublisher').value,
    };

    let deployRequest = {

      "Method": "Script",
      "NoF1Descriptor": true,
      "ScriptSystemEnv": systemEnv,
      "UserDefinedParameters": {}
    };

    console.log("DeployRequest: ", deployRequest);
    console.log("Deploy Request string: ", JSON.stringify(deployRequest));
    
    this.flogoDeployService.deployInfra(deployRequest)
      .subscribe(res => {
        console.log("Received Deployment response: ", res);

        let message = 'Success';
        if (res == undefined || res.Success == false) {
          message = 'Failure';
        }

        this._snackBar.open(message, "Deploy Pipeline", {
          duration: 3000,
        });

      });

  }

  undeploy() {

    let systemEnv = {
      "TargetServer": this.deployerForm.get('deployerURL').value,
      "Username": this.deployerForm.get('gatewayUsername').value,
      "Platform": this.deployerForm.get('gatewayPlatform').value,
    };

    let undeployRequest = {

      "Method": "Script",
      "NoF1Descriptor": true,
      "ScriptSystemEnv": systemEnv,
      "UserDefinedParameters": {}
    };

    console.log("UndeployRequest: ", undeployRequest);

    this.flogoDeployService.undeployInfra(undeployRequest)
      .subscribe(res => {
        console.log("Received Undeploy response: ", res);

        let message = 'Success';
        if (res == undefined || res.Success == false) {
          message = 'Failure';
        }

        this._snackBar.open(message, "Undeploy Infra", {
          duration: 3000,
        });

      });
  }

}
