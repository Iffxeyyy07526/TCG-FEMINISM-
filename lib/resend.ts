import { Resend } from 'resend';

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const getResend = () => {
    if (!resend) {
        console.warn('RESEND_API_KEY is not defined. Email functionality will be disabled.');
    }
    return resend;
};
