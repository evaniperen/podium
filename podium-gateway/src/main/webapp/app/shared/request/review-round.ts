/*
 * Copyright (c) 2017. The Hyve and respective contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * See the file LICENSE in the root of this repository.
 *
 */
import { User } from '../user/user.model';
import { RequestDetail } from './request-detail';
import { RequestReviewFeedback } from './request-review-feedback';

export class ReviewRound {

    id?: string;
    requestDetail?: RequestDetail = new RequestDetail();
    reviewFeedback?: RequestReviewFeedback[];
    startDate?: Date;
    endDate?: Date;
    initiatedBy?: User;

    constructor() {
    }

}
