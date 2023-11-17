import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dir-modal',
  templateUrl: './create-dir-modal.component.html',
  styleUrls: ['./create-dir-modal.component.css']
})
export class CreateDirModalComponent {
  folderName: any = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService : ApiService, private snack: MatSnackBar,
  private router: Router) { 
    console.log(data);
  }

  async createDirectory(){
    const key = this.data.key + this.folderName;
    const data = {
      file: '',
      filepath: key
    }

    await this.apiService.createFolder(data).then((response) => {
      this.snack.open(response.message, 'Close', { duration: 3000 });
      window.location.reload();
    },
    (error) => {
      this.snack.open(error.error.message, 'Close', { duration: 3000 });
    });
  }

}
