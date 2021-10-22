import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssetRequestComponent } from './create-asset-request.component';

describe('CreateAssetRequestComponent', () => {
  let component: CreateAssetRequestComponent;
  let fixture: ComponentFixture<CreateAssetRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssetRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
