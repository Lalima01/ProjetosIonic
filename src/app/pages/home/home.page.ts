import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AporteService } from 'src/app/services/aporte.service';
import { Aporte } from 'src/app/interfaces/aporte';
import { Custo } from 'src/app/interfaces/custo';
import { CustoService } from 'src/app/services/custo.service';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public aportes = new Array<Aporte>();
  public custos = new Array<Custo>();
  private aportesSubscription: Subscription;
  private custosSubscription: Subscription;
  public vrTotalAporte;

  constructor(private aporteService: AporteService,
              private custoService: CustoService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private toastCtrl: ToastController) {
    this.aportesSubscription = this.aporteService.getAportes().subscribe(data => { this.aportes = data; });
    this.custosSubscription = this.custoService.getCustos().subscribe(data => { this.custos = data; });
    this.vrTotalAporte = this.aporteService.getvalorTotalAporte();
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.aportesSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }finally {
      this.loading.dismiss();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  apresentaValor(vr: number) {
    console.log(`to aqui`);
  }
}
