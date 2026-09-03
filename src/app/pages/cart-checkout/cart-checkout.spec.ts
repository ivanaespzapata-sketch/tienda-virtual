import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartCheckout } from './cart-checkout';

describe('CartCheckout', () => {
  let component: CartCheckout;
  let fixture: ComponentFixture<CartCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCheckout],
    }).compileComponents();

    fixture = TestBed.createComponent(CartCheckout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
