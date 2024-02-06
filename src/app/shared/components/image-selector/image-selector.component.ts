import { Component } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {

  private file?: File;
  fileName: string = '';
  title: string = '';

  constructor(
    private imageServ: ImageService
  ) {

  }

  onFileUploadchange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      //image service to upload the image
      this.imageServ.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (res) => {
          console.log(res)
        }
      });
    }
  }
}
