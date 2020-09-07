

import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer {
    private static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    static sendEmail(data: { to: [string], subject: string, html: string }): Promise<any> {
        return NodeMailer.initializeTransport().sendMail({
            from: 'vicky@getaaaa.com',
            to: data.to,
            subject: data.subject,
            html: data.html
        });
    }
}


