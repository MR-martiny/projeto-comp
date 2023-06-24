import {Router} from 'express';
import Project from '@/app/schemas/Project';

const router = new Router();


//tudo abaixo daqui é o crud

router.get('/',(req, res)  => {

});

router.post('/',(req, res)  => {
    const {title, slug, description, category} = req.body;
    Project.create({title, slug, description, category})
    .then(project => {
        res.satus(200).send(project);
    }) //se a funçao der certo entra aqui

    .catch(error =>{
        console.error('Erro ao salvar no Banco de Dados',error);
        res
        .status(400)
        .send({
            error: 
            'Não foi porssivel salvar o projeto. Verifique os dados'
        }); //se a função deu errado entra aqui
    });
});

router.put('/',(req, res)  => {
    
});

router.delete('/',(req, res)  => {

});

export default router;