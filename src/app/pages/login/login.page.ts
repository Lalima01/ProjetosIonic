import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { auth } from 'firebase';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  // tslint:disable-next-line: no-shadowed-variable

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard
  ) { }
  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'O e-mail informado já esta cadastrado!';
          break;

        case 'auth/invalid-email':
          message = 'O e-mail informado é inválido!';
          break;

        case 'auth/argument-error':
          message = 'Dados incorretos para login!';
          break;

        case 'auth/weak-password':
          message = 'A senha deve ter no mínimo 6 caracteres!';
          break;
        case outerHeight:
          message = 'Usuário não cadastrado!';
          break;
      }

      //  console.error(error);
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.reigster(this.userRegister);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'O e-mail informado já esta cadastrado!';
          break;

        case 'auth/invalid-email':
          message = 'O e-mail informado é inválido!';
          break;

        case 'auth/argument-error':
          message = 'Dados incorretos para cadastro!';
          break;

        case 'auth/weak-password':
          message = 'A senha deve ter no mínimo 6 caracteres';
          break;
      }

      //  console.error(error);
      this.presentToast(message);
    } finally {
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

}
