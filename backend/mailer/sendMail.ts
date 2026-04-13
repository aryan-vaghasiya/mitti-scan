import nodemailer from "nodemailer";
import fs from "fs"
import path from "path";
import handlebars from "handlebars";
import dotevn from "dotenv/config";
import { fileURLToPath } from "url"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

async function sendMail({ to, subject, template, replacements } : { to: string, subject: string, template: string, replacements: any }) {
    const filePath = path.join(__dirname, "templates", template);
    const source = fs.readFileSync(filePath, "utf-8");

    const compiled = handlebars.compile(source);
    const html = compiled(replacements);

    const info = await transporter.sendMail({
        from: `"Mitti Scan" <${process.env.SMTP_FROM}>`,
        to,
        subject,
        html,
    });

    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    return info
}

export default sendMail;