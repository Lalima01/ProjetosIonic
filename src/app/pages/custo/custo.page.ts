import { Custo } from './../../interfaces/Custo';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustoService } from 'src/app/services/custo.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custo',
  templateUrl: './Custo.page.html',
  styleUrls: ['./Custo.page.scss'],
})
export class CustoPage implements OnInit {
  private custoId: string = null;
    // para usar = {} todos os campos do Intarfes devem ser opcionais
  public custo: Custo = {};
  // CustoLists para listar todos os Custos cadastrados
  public custoLists = new Array<Custo>();
  private loading: any;
  private custoSubscription: Subscription;

  constructor(
    private custoService: CustoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
      // para carregar os dados a serem alterados
    this.custoId = this.activatedRoute.snapshot.params.id;

    if (this.custoId) { this.loadCusto(); }
       // *
  // para carregar os Custos cadastrados
    this.custoSubscription = this.custoService.getCustos().subscribe(data => { this.custoLists = data; });
  }

  ngOnInit() { }

  // so irá existir se tiver recuperado um registro do banco - listener (comunicação entre objetos) rodando em backuground
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.custoSubscription) { this.custoSubscription.unsubscribe(); }
  }

  loadCusto() {
    // para carregar os dados a serem alterados
    console.log('loadCusto()');
    this.custoSubscription = this.custoService.getCusto(this.custoId).subscribe(data => {
      this.custo = data;
    });
  }

  async saveCusto() {
    await this.presentLoading();

    this.custo.userId = (await this.authService.getAuth().currentUser).uid;


    if (this.custoId) {
      try {
        await this.custoService.updateCusto(this.custoId, this.custo);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      } finally {
        this.loading.dismiss();
      }
    } else {
      this.custo.createdAt = new Date().getTime();

      try {
        await this.custoService.addCusto(this.custo);
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

  async delCusto(id: string) {
    try {
      console.log(id);
      await this.custoService.delCusto(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }
}
