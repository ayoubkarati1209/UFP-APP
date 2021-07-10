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
import * as $ from 'jquery';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-updateresearch',
  templateUrl: './updateresearch.component.html',
  styleUrls: ['./updateresearch.component.scss']
})
export class UpdateresearchComponent implements OnInit  {

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
  myDropDown: string;
  items = ['one', 'two', 'three'];
  origItems = ['one', 'two', 'three'];
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
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
   variableName = [
    {
        'id': '5a15b13c36e7a7f00cf0d7cb',
        'index': 2,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 23,
        'name': 'Karyn Wright',
        'gender': 'female',
        'company': 'ZOLAR',
        'email': 'karynwright@zolar.com',
        'phone': '+1 (851) 583-2547'
    },
    {
        'id': '5a15b13c2340978ec3d2c0ea',
        'index': 3,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 35,
        'name': 'Rochelle Estes',
        'disabled': true,
        'gender': 'female',
        'company': 'EXTRAWEAR',
        'email': 'rochelleestes@extrawear.com',
        'phone': '+1 (849) 408-2029'
    },
    {
        'id': '5a15b13c663ea0af9ad0dae8',
        'index': 4,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 25,
        'name': 'Mendoza Ruiz',
        'gender': 'male',
        'company': 'ZYTRAX',
        'email': 'mendozaruiz@zytrax.com',
        'phone': '+1 (904) 536-2020'
    },
    {
        'id': '5a15b13cc9eeb36511d65acf',
        'index': 5,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 39,
        'name': 'Rosales Russell',
        'gender': 'male',
        'company': 'ELEMANTRA',
        'email': 'rosalesrussell@elemantra.com',
        'phone': '+1 (868) 473-3073'
    },
    {
        'id': '5a15b13c728cd3f43cc0fe8a',
        'index': 6,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'name': 'Marquez Nolan',
        'gender': 'male',
        'company': 'MIRACLIS',
        'disabled': true,
        'email': 'marqueznolan@miraclis.com',
        'phone': '+1 (853) 571-3921'
    },
    {
        'id': '5a15b13ca51b0aaf8a99c05a',
        'index': 7,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 28,
        'name': 'Franklin James',
        'gender': 'male',
        'company': 'CAXT',
        'email': 'franklinjames@caxt.com',
        'phone': '+1 (868) 539-2984'
    },
    {
        'id': '5a15b13cc3b9381ffcb1d6f7',
        'index': 8,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'name': 'Elsa Bradley',
        'gender': 'female',
        'company': 'MATRIXITY',
        'email': 'elsabradley@matrixity.com',
        'phone': '+1 (994) 583-3850'
    },
    {
        'id': '5a15b13ce58cb6ff62c65164',
        'index': 9,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 40,
        'name': 'Pearson Thompson',
        'gender': 'male',
        'company': 'EZENT',
        'email': 'pearsonthompson@ezent.com',
        'phone': '+1 (917) 537-2178'
    },
    {
        'id': '5a15b13c90b95eb68010c86e',
        'index': 10,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 32,
        'name': 'Ina Pugh',
        'gender': 'female',
        'company': 'MANTRIX',
        'email': 'inapugh@mantrix.com',
        'phone': '+1 (917) 450-2372'
    },
    {
        'id': '5a15b13c2b1746e12788711f',
        'index': 11,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 25,
        'name': 'Nguyen Elliott',
        'gender': 'male',
        'company': 'PORTALINE',
        'email': 'nguyenelliott@portaline.com',
        'phone': '+1 (905) 491-3377'
    },
    {
        'id': '5a15b13c605403381eec5019',
        'index': 12,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 31,
        'name': 'Mills Barnett',
        'gender': 'male',
        'company': 'FARMEX',
        'email': 'millsbarnett@farmex.com',
        'phone': '+1 (882) 462-3986'
    },
    {
        'id': '5a15b13c67e2e6d1a3cd6ca5',
        'index': 13,
        'isActive': true,
        'picture': 'http://placehold.it/32x32',
        'age': 36,
        'name': 'Margaret Reynolds',
        'gender': 'female',
        'company': 'ROOFORIA',
        'email': 'margaretreynolds@rooforia.com',
        'phone': '+1 (935) 435-2345'
    },
    {
        'id': '5a15b13c947c836d177aa85c',
        'index': 14,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 29,
        'name': 'Yvette Navarro',
        'gender': 'female',
        'company': 'KINETICA',
        'email': 'yvettenavarro@kinetica.com',
        'phone': '+1 (807) 485-3824'
    },
    {
        'id': '5a15b13c5dbbe61245c1fb73',
        'index': 15,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 20,
        'name': 'Elisa Guzman',
        'gender': 'female',
        'company': 'KAGE',
        'email': 'elisaguzman@kage.com',
        'phone': '+1 (868) 594-2919'
    },
    {
        'id': '5a15b13c38fd49fefea8db80',
        'index': 16,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 33,
        'name': 'Jodie Bowman',
        'gender': 'female',
        'company': 'EMTRAC',
        'email': 'jodiebowman@emtrac.com',
        'phone': '+1 (891) 565-2560'
    },
    {
        'id': '5a15b13c9680913c470eb8fd',
        'index': 17,
        'isActive': false,
        'picture': 'http://placehold.it/32x32',
        'age': 24,
        'name': 'Diann Booker',
        'gender': 'female',
        'company': 'LYRIA',
        'email': 'diannbooker@lyria.com',
        'phone': '+1 (830) 555-3209'
    }
  ]
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
      setTimeout(function(){ window.location.reload() }, 3000);
      
    },(err)=>{
      console.log(err);
    })
  }
  selectEvent(item){
    
  }  
  
  onchangeSearch(search: string){

  }

  onFocused(e){

  }

}
