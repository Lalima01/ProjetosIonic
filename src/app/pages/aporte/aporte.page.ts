import { Aporte } from './../../interfaces/aporte';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AporteService } from 'src/app/services/aporte.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aporte',
  templateUrl: './aporte.page.html',
  styleUrls: ['./aporte.page.scss'],
})
export class AportePage implements OnInit {
  private aporteId: string = null;
    // para usar = {} todos os campos do Intarfes devem ser opcionais
  public aporte: Aporte = {};
  private loading: any;
  private aporteSubscription: Subscription;

  constructor(
    private aporteService: AporteService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.aporteId = this.activatedRoute.snapshot.params.id;

    if (this.aporteId) { this.loadAporte(); }
  }

  ngOnInit() { }

  // so irá existir se tiver recuperado um registro do banco - listener (comunicação entre objetos) rodando em backuground
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.aporteSubscription) { this.aporteSubscription.unsubscribe(); }
  }

  loadAporte() {
    console.log('update => ' + this.aporteId + ' ' + this.aporte.valor);
    this.aporteSubscription = this.aporteService.getAporte(this.aporteId).subscribe(data => {
      this.aporte = data;
    });
    console.log('update2 => ' + this.aporteId + ' ' + ' ' + this.aporteSubscription);
  }

  async saveAporte() {
    await this.presentLoading();

    this.aporte.userId = (await this.authService.getAuth().currentUser).uid;


    if (this.aporteId) {
      try {
        await this.aporteService.updateAporte(this.aporteId, this.aporte);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      } finally {
        this.loading.dismiss();
      }
    } else {
      this.aporte.createdAt = new Date().getTime();

      try {
        await this.aporteService.addAporte(this.aporte);
        await this.loading.dismiss();
        // voltar para a página anterior
        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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
}
