import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-file-modal',
  templateUrl: './upload-file-modal.component.html',
  styleUrls: ['./upload-file-modal.component.css']
})
export class UploadFileModalComponent {
  formGroup: FormGroup = this.formBuilder.group({
    file: new FormControl('', [Validators.required]),
    filepath: new FormControl('', [Validators.required])
  });
  selectedFile: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private apiService : ApiService,
  private snack: MatSnackBar) { 
    console.log(data);
  }

  uploadFile() {
    console.log(this.formGroup.value);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('filepath', this.formGroup.value.filepath);
    this.apiService.uploadFile(formData).then((response) => {
      this.snack.open(response.message, 'Close', { duration: 3000 });
      window.location.reload();
    },
    (error) => {
      this.snack.open(error.error.message, 'Close', { duration: 3000 });
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.formGroup.patchValue({
      file: this.selectedFile,
      filepath: this.data.key.substring(0, this.data.key.length - 1)
    });
  }

}
