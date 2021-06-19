import { Component, OnInit, NgZone,TemplateRef } from '@angular/core';
import { researchNv } from '../services/Research-nv.bd';
import {ViewChild, ElementRef} from '@angular/core';
import {news_nv} from '../services/news-nv.bd';
import { spac_new } from '../services/spac_new.bd';
import {ModalDismissReasons, NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { upload } from '../services/uploads.bd';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
declare var jQuery:any;

@Component({
  selector: 'app-updateresearch',
  templateUrl: './updateresearch.component.html',
  styleUrls: ['./updateresearch.component.scss']
})
export class UpdateresearchComponent implements OnInit {

  research_new: FormGroup;
  researchmodifs:FormGroup;
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
  fileInfos?: Observable<any>;
  researchmodid:any
  idresearchmodify:any
  display='none';
  modalRef: BsModalRef;
  @ViewChild('createNews') templateRef: TemplateRef<any>;
  constructor(public modalService: BsModalService,private uploads:upload,private http: HttpClient,public formBuilder: FormBuilder,private resarch:news_nv,private spac_new:spac_new ,private toastr:ToastrService,private NgZone:NgZone) {
    this.research_new = this.formBuilder.group({
      date:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required],
      pdf_link:['',Validators.required],
      spac_id:['',Validators.required],
      id_types:3
    })
    this.researchmodifs = this.formBuilder.group({
      date:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      spac_id:['',Validators.required],
      id_types:3
    })
   }
  
  ngOnInit(): void {
    this.getResearch();
    this.getspac_new();
    this.fileInfos = this.uploads.getFiles();
  }
  openModal(template: TemplateRef<any>) {
    const user = {
        id: 10
      };
    this.modalRef = this.modalService.show(template, {
      initialState : user
    });
  }
  showSuccess() {
    this.toastr.success('DATA ADDED SUCCESSFULLY','PLEASE REMOVE');
  }
  showError() {
    this.toastr.error('Ops Error !', 'error');
  }
  getResearch() {
    this.resarch.getAll()
      .subscribe(
        data => {

          this.allresarch = data;
          console.log(this.allresarch);

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
      this.modalRef.hide();
      this.newswithspac.length=0;
      this.getResearch();
    },
    error => {
   console.log(error);
    });

  }
  GetResearch(content,idresarch:any){
    this.idresearchmodify=idresarch
    this.resarch.get(idresarch)
      .subscribe(
        data => {
      
          this.researchmodifs.setValue({
            date:data['date'],
            title:data['title'],
            description:data['description'],
            spac_id:data['spac_id'],
            id_types:3
          })
        },
        error => {
       console.log(error);
        });
        this.openModal(content);
       
  }
  onModify():any {
    this.resarch.update(this.idresearchmodify,this.researchmodifs.value).subscribe(respones=>{
      this.allresarch.length=0;
      this.getResearch();
      this.modalRef.hide();
      this.showSuccess()
    },error=>{
      console.log(error);
    })
  }
  deleteR(content,idresarch){
    this.id_research=idresarch;
    this.openModal(content);
  }
  triggerModalcreate(content) {
    this.modalcreate=this.modalService.show(this.templateRef)
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalcreate.dismiss({
      'dismissed': true
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
        },(err)=>{
          console.log(err);
        })
        console.log(this.currentFilepdf.name);
      }
  
      this.selectedFiles = undefined;
    }
  }


  onSubmit(): any {
    this.resarch.create(this.research_new.value).subscribe((data)=>{
      this.lastnews=data
      console.log(this.lastnews.id);
      this.showSuccess()
      this.uploadimage()
      this.uploadpdf()
      this.allresarch.length=0;
      this.resarch.getAll()
      .subscribe(
        data => {
          this.allresarch = data;
          console.log(this.allresarch);

        },
        error => {
          console.log(error);
        });
      this.modalRef.hide();
      window.location.reload()
    },(err)=>{
      console.log(err);
    })
  }
}
