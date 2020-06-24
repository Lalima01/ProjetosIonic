import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AporteService } from 'src/app/services/aporte.service';
import { Aporte } from 'src/app/interfaces/aporte';
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
  private aportesSubscription: Subscription;

  constructor(private aporteService: AporteService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private toastCtrl: ToastController) {
    this.aportesSubscription = this.aporteService.getAportes().subscribe(data => { this.aportes = data; });
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

  async delAporte(id: string) {
    try {
      console.log(id);
      await this.aporteService.delAporte(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }
}
