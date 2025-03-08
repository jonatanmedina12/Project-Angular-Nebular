// Para desactivar el Service Worker, edita el archivo principal (main.ts)
// y quita la referencia a serviceWorker.register()

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Nota: Si estabas registrando el Service Worker, el código original se vería así:
/*
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Código de Service Worker que deberías comentar o eliminar
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(
    registration => {
      console.log('Service Worker registrado correctamente');
    },
    err => {
      console.error('Error al registrar el Service Worker', err);
    }
  );
}
*/