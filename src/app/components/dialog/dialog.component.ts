import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  form: FormGroup;
  columnsData;
  get columnsFormArray() {
    return this.form.controls['columns'] as FormArray;
  }

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      columns: new FormArray([])
    });
    this.columnsData = data.dataKey
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.columnsData.forEach(() => this.columnsFormArray.push(new FormControl(false)));
  }
}
