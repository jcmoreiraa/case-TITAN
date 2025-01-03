import { PrismaClient, Prisma } from '@prisma/client';
import z from 'zod';
import { UserCreateInputSchema } from './generated/validateSchema';

const prisma = new PrismaClient();

async function main() {
  const dados = [
    {
      nome: 'Júlio César Silva Moreira',
      email: 'juliomoreira@ufba.br',
    },
    {
      nome: 'Laís Abbid Gonzalez',
      email: 'laisgonzalez@ufba.br',
    }
  ];

  try {
    for (const user of dados) {
      try {
        UserCreateInputSchema.parse(user); 
        console.log(`Dados válidos para ${user.email}`);
      } catch (error: any) {
        console.log(`Erro de validação para o usuário ${user.email}:`, error);
        return;
      }
    }

    const dadosZod = await prisma.user.createMany({
      data: dados,
    });
    console.log('Usuários criados com sucesso:', dadosZod);

  } catch (e: any) {
    console.error('Erro no processo principal:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('Erro inesperado:', e);
});
