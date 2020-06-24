import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AportePage } from './aporte.page';

describe('AportePage', () => {
  let component: AportePage;
  let fixture: ComponentFixture<AportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AportePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
