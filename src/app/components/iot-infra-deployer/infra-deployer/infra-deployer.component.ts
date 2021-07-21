import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SelectItem } from '../iot-infra-deployer.component';
import {MatTableModule} from '@angular/material/table'
import { DateFormat } from 'ng2-google-charts/lib/google-charts-datatable';


export interface PeriodicElement {
  name: string;
  id: number;
  description: string;
  created: String;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'package1', description: 'camera', created: '1/20/2021'},
  {id: 2, name: 'package2', description: 'object', created: '07/20/2021'},
  {id: 3, name: 'package3', description: 'box', created: '07/21/2021'},
];

@Component({
  selector: 'app-infra-deployer',
  templateUrl: './infra-deployer.component.html',
  styleUrls: ['./infra-deployer.component.css']
})
export class InfraDeployerComponent implements OnInit {
  dateFormat = 'yyyy-MM-dd  HH:mm:ss'
  displayedColumns: string[] = ['id', 'name', 'description', 'created'];
  dataSource = ELEMENT_DATA;
  

  constructor() { }
  

  ngOnInit(): void {
  }
  selectedRowIndex = -1;

  highlight(row){
    this.selectedRowIndex = row.id;
    }

}
