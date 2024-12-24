import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    try{
          const dados = await  prisma.user.createMany({
                data:[{
                    nome: 'Júlio César Silva Moreira',
                    email: 'juliomoreira@ufba.br'},
                    {
                        nome:'Laís Abbid Gonzalez',
                        email: 'laisgonzalez@ufba.br'
                    }
                ]    
            })
            console.log(dados)
        }

    catch(e:any){
        return console.log(e.message)

    }

    await prisma.$disconnect();

    
}

main().catch(e => {
    console.error('Erro no processo principal:', e);
});
