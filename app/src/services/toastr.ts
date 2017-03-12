import {Injectable} from "@angular/core";
import {ToastsManager, ToastOptions} from "ng2-toastr/ng2-toastr";


@Injectable()
export class ToasterService {

  constructor(public toastr: ToastsManager) {

  }

  showSuccess(title: string, body: string = '') {
    this.toastr.success(body, title);
  }

  showError(title: string, body: string = '') {
    this.toastr.error(body, title);
  }

  showWarning(title: string, body: string = '') {
    this.toastr.warning(body, title);
  }

  showInfo(body: string, title: string = '') {
    this.toastr.info(body, title);
  }

  showCustom(body: string, title: string = '') {
    this.toastr.custom(body, title, {enableHTML: true});
  }


}

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can pass any options to override defaults
  newestOnTop = false;
  showCloseButton = true;
  dismiss = 'auto';
}
