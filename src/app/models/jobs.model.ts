export interface Jobs {
    data: Array<JobsData>;
    total_records: number;
    current_page: number;
    total_pages: number;
}

export interface JobsData {
    job_uid: string;
    customer: {
        customer_last_name: string;
        customer_email: string;
        customer_first_name: string;
        customer_uid: string;
    };
    prefix: string;
    assigned_to: [
        {
            user: {
                user_uid: string;
                first_name: string;
                last_name: string;
                profile_picture: string;
            };
            team: {
                team_uid: string;
                team_name: string;
            };
        }
    ];
    job_title: string;
    job_category: {
        category_name: string
        category_uid: string;
    };
    job_priority: string;
    scheduled_start_time: string;
    scheduled_end_time: string;
    current_job_status: {
        status_uid: string;
        status_name: string;
    };
    customer_address: {
        city: string;
        street: string;
        zip_code: string;
        first_name: string;
        last_name: string;
        email: string;
    };
    customer_billing_address: {
        landmark: string;
        city: string;
        state: string;
        street: string;
        zip_code: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        email: string;
    };
    work_order_number: number;
}
