import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UsuarioService } from '../../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder,
        public _usrService: UsuarioService, 
        public router: Router, 
        public activateRoute:ActivatedRoute) {

        this.valForm = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            let usaurio = new Usuario(null,null, value.password, value.username);
            this._usrService.login(usaurio).subscribe(() => this.router.navigate(['/']));
        }
    }

    ngOnInit() {

    }

}
