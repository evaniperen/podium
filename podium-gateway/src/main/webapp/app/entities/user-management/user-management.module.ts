/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { userMgmtRoute, userDialogRoute, UserResolvePagingParams, UserResolve } from './user-management.route';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PodiumGatewaySharedModule } from '../../shared/shared.module';
import { PodiumGatewayAdminModule } from '../../admin/admin.module';
import { RouterModule } from '@angular/router';
import { UserMgmtComponent } from './user-management.component';
import { UserDialogComponent, UserMgmtDialogComponent } from './user-management-dialog.component';
import { UserDeleteDialogComponent, UserMgmtDeleteDialogComponent } from './user-management-delete-dialog.component';
import { UserUnlockDialogComponent, UserMgmtUnlockDialogComponent } from './user-management-unlock-dialog.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserModalService } from './user-modal.service';

let ENTITY_STATES = [
        ...userMgmtRoute,
        ...userDialogRoute
];

@NgModule({
    imports: [
        PodiumGatewaySharedModule,
        PodiumGatewayAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserUnlockDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        UserMgmtUnlockDialogComponent,
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        UserMgmtUnlockDialogComponent,
    ],
    providers: [
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PodiumGatewayUserMgmtModule {}
