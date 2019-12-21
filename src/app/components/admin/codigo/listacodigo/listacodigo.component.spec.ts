import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacodigoComponent } from './listacodigo.component';

describe('ListacodigoComponent', () => {
  let component: ListacodigoComponent;
  let fixture: ComponentFixture<ListacodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
