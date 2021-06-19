import { Component,TemplateRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  name = 'Angular 5';
  modalRef: BsModalRef;
    @ViewChild('template') templateRef: TemplateRef<any>;
  constructor(public modalService: BsModalService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    const user = {
        id: 10
      };
    this.modalRef = this.modalService.show(template, {
      initialState : user
    });
     setTimeout(() => {
       this.modalRef.hide();
      },5000)
  }
}
