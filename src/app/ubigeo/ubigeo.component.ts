import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ubigeo',
  templateUrl: './ubigeo.component.html',
  styleUrls: ['./ubigeo.component.css']
})
export class UbigeoComponent implements OnInit {

  constructor(private http: HttpClient) { }
  file: any;
  department: any = [];
  province: any = [];
  district: any = [];
  process: boolean;
  fileChanged(e) {
      this.process = true;
      this.file = e.target.files[0];
      const fileReader = new FileReader();
      let ubigeoArray;
      fileReader.onload = (e) => {
        setTimeout(() => {
        ubigeoArray = fileReader.result.toString().split('\n');
        ubigeoArray.forEach(element => {
          const lineSplit = element.split('/');
          if (lineSplit.length < 3) {
            alert('Archivo no soportado');
            this.department = [];
            this.province = [];
            this.district = [];
            return;
          }
          const newDepartment = this.buildDepartment(lineSplit);
          if (!this.department.find(dep => dep.code === newDepartment.code)) {
            this.department.push(newDepartment);
          }

          const newProvince = this.buildProvince(lineSplit);
          if (newProvince !== null && !this.province.find(prov => prov.code === newProvince.code)) {
            this.province.push(newProvince);
          }

          const newDistrict = this.buildDistrict(lineSplit);
          if (newDistrict !== null && !this.district.find(dist => dist.code === newDistrict.code)) {
            this.district.push(newDistrict);
          }

        });
        this.process = false;

        }, 1500);

      };
      fileReader.readAsText(this.file);
  }
  ngOnInit() {

  }

  initForm() {
    this.file = undefined;

  }

  buildDepartment(element) {
    return {code: element[0].match(/\d+/g)[0], name:  element[0].match(/[a-zA-Z- ]+/g)[0], fatherCode: '-', fatherName: '-'};
  }

  buildProvince(element) {
    const province = (element[1].trim().length !== 0) ?
      {code: element[1].match(/\d+/g)[0], name:  element[1].replace(element[1].match(/\d+/g)[0], ''),
      fatherCode: element[0].match(/\d+/g)[0], fatherName: element[0].replace(element[0].match(/\d+/g)[0], '')} :
      null;
    return province;
  }

  buildDistrict(element) {
    const district = (element[2].trim().length !== 0) ?
      {code: element[2].match(/\d+/g)[0], name:  element[2].replace(element[2].match(/\d+/g)[0], ''),
      fatherCode: element[1].match(/\d+/g)[0], fatherName: element[1].replace(element[1].match(/\d+/g)[0], '')} :
      null;
    return district;
  }


}
