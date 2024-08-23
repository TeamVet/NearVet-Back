import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import { CreateEmailDto } from "./dto/createEmail.dto";

@Injectable()
export class EmailProvider {

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });

    async sendEmail (createEmailDto: CreateEmailDto) {
        
        const info = await this.transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: "eze.g.alonso@gmail.com", // list of receivers
            subject: createEmailDto.subjectEmail,
            html: createEmailDto.message
          });
        
          console.log("Message sent: %s", info.messageId);
    }
}