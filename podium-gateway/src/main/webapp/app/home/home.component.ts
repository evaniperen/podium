/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';
import { Account, Principal } from '../shared';
import { Router } from '@angular/router';
import { Ng2DeviceService } from 'ng2-device-detector';

@Component({
    selector: 'pdm-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    deviceInfo: any;

    constructor(
        private principal: Principal,
        private eventManager: EventManager,
        private router: Router,
        private deviceService: Ng2DeviceService
    ) {

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        if (this.isAuthenticated()) {
            this.router.navigate(['/']);
        }

        this.deviceInfo = this.deviceService.getDeviceInfo();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    isBrowserIE(): boolean {
        return this.deviceInfo.browser === 'ie';
    }

}
