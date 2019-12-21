import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';
import{User} from '../../../../models/user';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'jw-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
	@Input() id: string;
	@Input() user;
	private element: any;
	public token: any; 
    title;
    constructor(
		private modalService: ModalService, 
		private el: ElementRef,
		// public modalRef: BsModalRef
		) {
      this.element = el.nativeElement;
    }
      
    ngOnInit(): void {
		//    if (!this.id ) { console.error('modal must have an id'); return; }   
		//    document.body.appendChild(this.element);
		//    this.element.addEventListener('click', el => {
		// 	   if (el.target.className === 'jw-modal') {this.close(); }
		// 	});
		// 	this.modalService.add(this);
	}
	
	ngOnDestroy(): void {
		this.modalService.remove(this.id);
		this.element.remove();
	}
	
	open(): void {
		this.element.style.display = 'block';
			document.body.classList.add('jw-modal-open');
		
		}
	
		close(): void {
			this.element.style.display = 'none';
			document.body.classList.remove('jw-modal-open');
		}

}
