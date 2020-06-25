import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustoPage } from './custo.page';

describe('CustoPage', () => {
  let component: CustoPage;
  let fixture: ComponentFixture<CustoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
