/*
 * Copyright (c) 2017  The Hyve and respective contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * See the file LICENSE in the root of this repository.
 */

package org.bbmri.podium.common.security.annotations;

import java.lang.annotation.*;

/**
 * Mark a controller method as accessible for any authorised user with
 * any of the authorities in {@link #value()}.
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SecuredByAuthority {

    /**
     * Authority names. See {@link org.bbmri.podium.domain.Authority}.
     */
    String[] value() default {};

}