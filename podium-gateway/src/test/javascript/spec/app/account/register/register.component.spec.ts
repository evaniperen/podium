/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */
import { ComponentFixture, TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import { Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { LoginModalService } from '../../../../../../main/webapp/app/shared';
import { Register } from '../../../../../../main/webapp/app/account/register/register.service';
import { RegisterComponent } from '../../../../../../main/webapp/app/account/register/register.component';
import { PodiumTestModule } from '../../../test.module';
import { Router } from '@angular/router';
import { MockRouter } from '../../../helpers/mock-route.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../../../../main/webapp/app/shared/message/message.service';

describe('Component Tests', () => {

    describe('RegisterComponent', () => {
        let fixture: ComponentFixture<RegisterComponent>;
        let comp: RegisterComponent;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PodiumTestModule],
                declarations: [RegisterComponent],
                providers: [
                    Register,
                    MessageService,
                    {
                        provide: Router,
                        useClass: MockRouter
                    },
                    {
                        provide: LoginModalService,
                        useValue: null
                    },
                    {
                        provide: Renderer,
                        useValue: null
                    },
                    {
                        provide: ElementRef,
                        useValue: null
                    }, {
                        provide: TranslateService,
                        useValue: null
                    }
                ]
            }).overrideTemplate(RegisterComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegisterComponent);
            comp = fixture.componentInstance;
            comp.ngOnInit();
        });

        it('should ensure the two passwords entered match', function () {
            comp.registerAccount.password = 'password';
            comp.confirmPassword = 'non-matching';

            comp.register();

            expect(comp.doNotMatch).toEqual('ERROR');
        });

        it('should update success to OK after creating an account',
            inject([Register, JhiLanguageService],
              fakeAsync((service: Register, mockTranslate: MockLanguageService) => {
                  spyOn(service, 'save').and.returnValue(Observable.of({}));
                  spyOn(comp, 'processSuccess');

                  comp.registerAccount.password = comp.confirmPassword = 'password';

                  comp.register();
                  tick();

                  expect(service.save).toHaveBeenCalledWith({
                      specialism: '',
                      password: 'password',
                      langKey: 'en'
                  });

                  expect(comp.processSuccess).toHaveBeenCalled();

                  expect(comp.registerAccount.langKey).toEqual('en');
                  expect(mockTranslate.getCurrentSpy).toHaveBeenCalled();
                  expect(comp.errorUserExists).toBeNull();
                  expect(comp.errorEmailExists).toBeNull();
                  expect(comp.error).toBeNull();
              })
            )
        );

        it('should notify of user existence upon 400/login already in use',
            inject([Register],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(Observable.throw({
                        status: 400,
                        _body: 'login already in use'
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorUserExists).toEqual('ERROR');
                    expect(comp.errorEmailExists).toBeNull();
                    expect(comp.error).toBeNull();
                })
            )
        );

        it('should notify of email existence upon 400/email address already in use',
            inject([Register],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(Observable.throw({
                        status: 400,
                        _body: 'email address already in use'
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorEmailExists).toEqual('ERROR');
                    expect(comp.errorUserExists).toBeNull();
                    expect(comp.error).toBeNull();
                })
            )
        );

        it('should notify of generic error',
            inject([Register],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(Observable.throw({
                        status: 503
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorUserExists).toBeNull();
                    expect(comp.errorEmailExists).toBeNull();
                    expect(comp.error).toEqual('ERROR');
                })
            )
        );
    });
});
