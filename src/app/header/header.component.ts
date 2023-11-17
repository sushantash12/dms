import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDirModalComponent } from '../create-dir-modal/create-dir-modal.component';
import { UploadFileModalComponent } from '../upload-file-modal/upload-file-modal.component';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  key : any;
  username = sessionStorage.getItem('username');

  constructor(private sharedService: SharedService, public dialog: MatDialog, private apiService: ApiService,
    private snack: MatSnackBar) {
    this.key = this.username + '/';
    this.sharedService.fileData.subscribe(data => {
      this.key = data?.Key;
    });
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  openCreateDirectoryDialog() {
    const dialogRef = this.dialog.open(CreateDirModalComponent,
      {
        data: {
          key: this.key
        }
      });
      console.log(this.key);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openUploadFileDialog() {
    const dialogRef = this.dialog.open(UploadFileModalComponent,
      {
        data: {
          key: this.key
        }
      });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  downloadFile() {
    const obj = {
      filepath: this.key
    }
    this.apiService.downloadFile(obj).then((response) => {
      console.log(response.url);
      window.open(response.url, '_blank');
      this.snack.open(response.message, 'Close', { duration: 3000 });
    },
    (error) => {
      this.snack.open(error.error.message, 'Close', { duration: 3000 });
    });
  }

  deleteFile() {
    const obj = {
      filepath: this.key
    }
    this.apiService.deleteFile(obj).then((response) => {
      this.snack.open(response.message, 'Close', { duration: 3000 });
      window.location.reload();
    },
    (error) => {
      this.snack.open(error.error.message, 'Close', { duration: 3000 });
    });
  }
}
