import {Component, OnInit} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styles: []
})
export class UploadComponent implements OnInit {

    public fileList = [];
    public files: UploadFile[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    public dropped(event: UploadEvent) {
        this.files = event.files;
        for (const droppedFile of event.files) {

            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath, file);

                    /**
                     // You could upload it like this:
                     const formData = new FormData()
                     formData.append('logo', file, relativePath)

                     // Headers
                     const headers = new HttpHeaders({
                        'security-token': 'mytoken'
                      })

                     this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                     .subscribe(data => {
                        // Sanitized logo returned from backend
                      })
                     **/

                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                console.log(droppedFile.relativePath, fileEntry);
            }
        }

        this.fileList.push(this.files);
    }

    public fileOver(event) {
    }

    public fileLeave(event) {
    }

}
