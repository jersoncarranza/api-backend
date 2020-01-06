import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotosComponent } from './votos.component';

describe('VotosComponent', () => {
  let component: VotosComponent;
  let fixture: ComponentFixture<VotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
