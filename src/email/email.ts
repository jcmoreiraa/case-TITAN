import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import express from 'express';

const prisma = new PrismaClient();

const userRouter = Router()
userRouter.post("/email", async (request: Request, response: Response) => {
  const { nomes } = request.body;
  
  if (!Array.isArray(nomes) || nomes.length === 0) {
     response.status(400).json({ error: "Nomes não fornecidos ou inválidos." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "juliomoreira0111@gmail.com", 
        pass: "guvf zjpp mmpy vlzw", 
      },
    });

    const users = await prisma.user.findMany({
      where: {
        nome: {
          notIn: nomes,
        },
      },
      select: {
        email: true, 
        nome: true, 
      },
    });

    if (users.length === 0) {
       response.status(404).json({ error: "Nenhum usuário encontrado." });
    }

    for (const user of users) {
      const { email, nome } = user;

      await transporter.sendMail({
        from: "Equipe TITAN <juliomoreira0111@gmail.com>", 
        to: email,
        subject: "Justificativa AGO",
        html: `
          <p style="font-family: Arial, sans-serif; font-size: 16px; color: #000000;">
            Olá <strong>${nome}</strong>,<br><br>
          </p>
          <p style="font-family: Arial, sans-serif; font-size: 14px; color: #000000;">
            Atenciosamente,<br>
            <strong>Equipe DGP </strong>
          </p>
        `,
      });

      console.log(`E-mail enviado para: ${email}`);
    }

    response.status(200).json({ message: "E-mails enviados com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    response.status(500).json({ error: "Erro ao processar a solicitação." });
  }
});

export default userRouter;
