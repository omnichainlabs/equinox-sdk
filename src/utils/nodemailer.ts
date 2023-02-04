import {
  createTransport,
  Transporter
} from 'nodemailer'

let transporter: Transporter

export const nodemailerSingleton = (): Transporter => {
  if (transporter === undefined) {
    transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    })
  }
  return transporter
}
