import {Router} from 'express';
import Project from '@/app/schemas/Project';

const router = new Router();


//tudo abaixo daqui é o crud

router.get('/',(req, res)  => {
        Project.find()
        .then(data => {
            const projects = data.map(project =>{
                return {title: project.title, category: project.category};          //isso aqui é pramostrar todos os portifoliosde uma vez                   
            });
            res.send(projects);
        }).catch(error =>{
            console.error('Erro ao salvar no Banco de Dados',error);
            res
            .status(400)
            .send({
                error: 
                'Não foi porssivel obter os  dados do projeto, tente novamente'
            }); //se a função deu errado entra aqui
        });
});


router.get('/id/:projectId',(req, res)  => {
    Project.findbyId(req.params.projectdId)
    .then(data => {
        const projects = data.map(project =>{
            return {title: project.title, category: project.category};          //isso aqui é pramostrar todos os portifoliosde uma vez                   
        });
        res.send(projects);
    }).catch(error =>{
        console.error('Erro ao salvar no Banco de Dados',error);
        res
        .status(400)
        .send({
            error: 
            'Não foi porssivel obter os  dados do projeto, tente novamente'
        }); //se a função deu errado entra aqui
    });
});

router.get('/slug/projectSlug',(req, res)  => {});



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