import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    this.getToastContainer();
  }
  private getToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-end toast-start z-50';
      document.body.appendChild(container);
    }
  }
  private createToastElement(message: string, alertClass: string, duration:number= 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      return;
    }
    const toast = document.createElement('div');
    toast.classList.add('alert', alertClass, 'shadow-lg', 'text-sm');

    const text = document.createElement('span');
    text.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'btn btn-sm btn-ghost ml-4';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', () => {
      toastContainer?.removeChild(toast);
    });

    toast.appendChild(text);
    toast.appendChild(closeButton);
    toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }
  success(message: string, duration: number ) {
    this.createToastElement(message, 'alert-success', duration);
  }
  error(message: string, duration: number) {
    this.createToastElement(message, 'alert-error', duration);
  }
  warn(message: string, duration: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }
  info(message: string, duration: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
