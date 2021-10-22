import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequestsViewComponent } from './asset-requests-view.component';

describe('AssetRequestsViewComponent', () => {
  let component: AssetRequestsViewComponent;
  let fixture: ComponentFixture<AssetRequestsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetRequestsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
