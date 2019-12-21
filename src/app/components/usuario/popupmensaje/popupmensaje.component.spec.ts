import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmensajeComponent } from './popupmensaje.component';

describe('PopupmensajeComponent', () => {
  let component: PopupmensajeComponent;
  let fixture: ComponentFixture<PopupmensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
