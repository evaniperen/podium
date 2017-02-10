/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */

import { Authority } from './authority';

const authorityNames: { [token: string]: string; } = {
    'ROLE_PODIUM_ADMIN':                'Podium administrator',
    'ROLE_BBMRI_ADMIN':                 'BBMRI administrator',
    'ROLE_ORGANISATION_ADMIN':          'Organisation administrator',
    'ROLE_ORGANISATION_COORDINATOR':    'Organisation coordinator',
    'ROLE_REVIEWER':                    'Reviewer',
    'ROLE_RESEARCHER':                  'Researcher'
};

function convertNamesToAuthorities(names: { [token: string]: string; }): Array<Authority> {
    let result: Array<Authority> = [];
    for (const token in names) {
        result.push({ token: token, name: names[token] });
    }
    return result;
}

function convertToAuthorityMap(authorities: ReadonlyArray<Authority>): { [token: string]: Authority; } {
    let result: { [token: string]: Authority; } = {};
    for (let authority of authorities) {
        result[authority.token] = authority;
    }
    return result;
}

export const AUTHORITIES: ReadonlyArray<Authority> = convertNamesToAuthorities(authorityNames);

export const AUTHORITIES_MAP: { [token: string]: Authority; } = convertToAuthorityMap(AUTHORITIES);