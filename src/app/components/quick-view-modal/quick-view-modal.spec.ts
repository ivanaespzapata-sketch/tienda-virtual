import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickViewModal } from './quick-view-modal';

describe('QuickViewModal', () => {
  let component: QuickViewModal;
  let fixture: ComponentFixture<QuickViewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickViewModal],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickViewModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
