import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MatTableModule,} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

/** PIPES  */
import { CapitalizePipe } from 'src/app/helpers/Capitalize.pipe';

/**  LAYOUT */
import { MainComponent } from './layout/main/main.component';
import { AuthComponent } from 'src/app/layout/auth/auth.component';

/** COMPONENTS  */
import { AppComponent } from './app.component';
import { HeaderComponent } from '@template/header/header.component';
import { FooterComponent } from '@template/footer/footer.component';
import { NavComponent } from '@template/nav/nav.component';
import { ToggleSlideComponent } from '@template/toggle-slide/toggle-slide.component';
import { HomeComponent } from '@views/home/home.component';
import { CrudComponent } from '@views/product/crud/crud.component';
import { ProductCreateComponent } from '@components/product/product-create/product-create.component';
import { ProductReadComponent } from '@components/product/product-read/product-read.component';
import { ProductUpdateComponent } from '@components/product/product-update/product-update.component';

import { httpInterceptorProviders } from '@auth/interceptors';

import locale from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import { TableComponent } from './shared/table/table.component';
import {MatExpansionModule} from "@angular/material/expansion";

registerLocaleData(locale);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CrudComponent,
    ProductCreateComponent,
    ProductReadComponent,
    ProductUpdateComponent,
    ToggleSlideComponent,
    MainComponent,
    CapitalizePipe,
    AuthComponent,
    TableComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
        }),
        SweetAlert2Module.forRoot(),
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
