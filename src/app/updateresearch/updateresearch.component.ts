import { Component, OnInit, NgZone } from '@angular/core';
import { researchNv } from '../services/Research-nv.bd';
import {ViewChild, ElementRef} from '@angular/core';
import {news_nv} from '../services/news-nv.bd';
import { spac_new } from '../services/spac_new.bd';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { upload } from '../services/uploads.bd';
declare var jQuery:any;

@Component({
  selector: 'app-updateresearch',
  templateUrl: './updateresearch.component.html',
  styleUrls: ['./updateresearch.component.scss']
})
export class UpdateresearchComponent implements OnInit {
  research_new: FormGroup;

  @ViewChild('modalData', { static: true }) modalData: UpdateresearchComponent;
  closeModal: string;
  allresarch:any;
  researchwithid:any;
  spacs_new:any;
  id_research:any;
  newswithspac=[];
  uploadfiles={
    file:'',
    news_id:'',
  }
  news_id=5
  selectedFiles?: FileList;
  currentFile?: File;
  selectedFilespdf?: FileList;
  currentFilepdf?: File;
  lastnews:any
  modalcreate:any
  type:any
  typepdf:any
  constructor(private uploads:upload,private http: HttpClient,public formBuilder: FormBuilder,private resarch:news_nv,private modalService: NgbModal,private spac_new:spac_new ,private toastr:ToastrService,private NgZone:NgZone) {
    this.research_new = this.formBuilder.group({
      type:['',Validators.required],
      date:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required],
      pdf_link:['',Validators.required],
      spac_id:['',Validators.required],
      id_types:['',Validators.required]
    })
   }
  
  ngOnInit(): void {
    this.getResearch();
    this.getspac_new();
  }
  showSuccess() {
    this.toastr.success('Les informations sons ajoutés avec succès !','succes');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
  getResearch() {
    this.resarch.getAll()
      .subscribe(
        data => {
          this.allresarch = data;
          for(let r of this.allresarch) {
            this.newswithspac.push({id:r.id,title:r.title,date:r.date,type:r.type,description:r.description,image:r.image,pdf_link:r.pdf_link,name:r.spac.name});
          }
          console.log(this.newswithspac);
        },
        error => {
          console.log(error);
        });
  }
  getspac_new(){
    this.spac_new.getAll()
    .subscribe(
      data=>{
        console.log(data);
        this.spacs_new=data;
      },
      error=>{
        console.log(error);
      }
    )
  }
  Delete(idresarch:any){
this.resarch.delete(idresarch)
  .subscribe(
    response => {
      this.newswithspac.length=0;
      this.getResearch();
    },
    error => {
   console.log(error);
    });

  }
  deleteR(content,idresarch){
    this.id_research=idresarch;
this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
  this.closeModal = `Closed with: ${res}`;
}, (res) => {
  this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
});
  }
  triggerModalcreate(content) {
    this.modalcreate=this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

   getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  selectFilePdf(event:any):void{
  this.selectedFilespdf = event.target.files;
  }
  uploadimage(){
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.type=0
        this.uploads.upload(this.currentFile,this.lastnews.id,this.type).subscribe((event: any)=>{
         console.log('data success')
        },(err)=>{
          console.log(err);
        })
        console.log(this.currentFile.name);
      }
  
      this.selectedFiles = undefined;
    }
  }
  uploadpdf(){
    if (this.selectedFilespdf) {
      const file: File | null = this.selectedFilespdf.item(0);
      if (file) {
        this.currentFilepdf = file;
        this.typepdf=1
        this.uploads.upload(this.currentFilepdf,this.lastnews.id,this.typepdf).subscribe((event: any)=>{
         console.log('data success')
        },(err)=>{
          console.log(err);
        })
        console.log(this.currentFilepdf.name);
      }
  
      this.selectedFiles = undefined;
    }
  }
  downloadfile(){

  }
  onSubmit(): any {
    this.resarch.create(this.research_new.value).subscribe((data)=>{
      this.lastnews=data
      console.log(this.lastnews.id);
      this.showSuccess()
      this.getResearch()
      this.uploadimage()
      this.uploadpdf()
      this.closeModal = `Dismissed ${this.getDismissReason(ModalDismissReasons.ESC)}`;

    },(err)=>{
      console.log(err);
    })
  }
}
