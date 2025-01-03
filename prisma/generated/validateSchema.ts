import { Prisma } from '@prisma/client';
import z from 'zod'


export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
      id: z.string().uuid().optional(),
      email: z.string().email({message:'Não está no formato email'}),
      nome: z.string().optional().nullable()
    }).strict();
    
