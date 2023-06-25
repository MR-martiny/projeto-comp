import {Router} from 'express';
import Project from '@/app/schemas/Project';
import Slugify from '@/utils/Slugify';

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
            res.status(400).send({
                error: 
                'Não foi porssivel obter os  dados do projeto, tente novamente'
            }); //se a função deu errado entra aqui
        });
});


/*router.get('/id/:projectId',(req, res)  => {
    Project.findbyId(req.params.projectdId)
    .then(project => {
        res.send(project);
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
*/ //aoinves de fazer assim, oescolhido  foi fazer pela slug



router.get('/:pesquisaProjeto',(req, res)  => {
    Project.findOne({title: req.body.title, description: req.body.description})  //procurar um projeto especifico com pela  descrição  e titulo
    .then(project => {
        res.send(project);
    })
    .catch(error =>{
        console.error('Erro ao obter o projeto no Banco de Dados',error);
        res.status(400).send({
            error: 
            'Não foi porssivel obter os  dados do projeto, tente novamente'
        }); //se a função deu errado entra aqui
    });
});

router.get('/:pesquisaTitulo',(req, res)  => {
    Project.findOne({title: req.body.title})  //procurar um projeto especifico so pelo titulo
    .then(project => {                         //se quiser encontrar todos com titulos iguais,substitua o "findOne" por apenas "find"
        res.send(project);
    })
    .catch(error =>{
        console.error('Erro ao obter o projeto no Banco de Dados',error);
        res.status(400).send({
            error: 
            'Não foi porssivel obter os  dados do projeto, tente novamente'
        }); //se a função deu errado entra aqui
    });
});
router.get('/:projectSlug',(req, res)  => {
    Project.findOne({slug: req.params.slug})
    .then(project => {                         
        res.send(project);
    })
    .catch(error =>{
        console.error('Erro ao obter o projeto no Banco de Dados',error);
        res.status(400).send({
            error: 
            'Não foi porssivel obter os  dados do projeto, tente novamente'
        }); 
    });
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

router.put('/:projectId',(req, res)  => {                                   // ele é tipo o create, ele pega os dados e manda pro mongo analisar
    const {title, description, category} = req.body;        // o mongo olha e descarta o que nao mudou, e altera o q mudou
    let slug = undefined;

    if(title){
        slug = Slugify(title);

    }

    Project.findByIdAndUpdate(req.params.projectId,
         {title, slug, description, category},
          {new: true},
          )
    .then(project => {
        res.satus(200).send(project);
    }) //se a funçao der certo entra aqui

    .catch(error =>{
        console.error('Erro ao salvar o projeto no Banco de Dados',error);
        res
        .status(400)
        .send({
            error: 
            'Não foi porssivel atualizar o projeto. Verifique os dados'
        }); //se a função deu errado entra aqui
    });
    
});

router.delete('/:projectId',(req, res)  => {
    Project.findByIdAndRemove(req.params.projectId).then(()=>{
        res.send ({message: 'Projeto removido com sucesso!'});
    }).catch (error => {
        console.error ('Erro ao remover projeto do banco de dados', error);
        res.status(400).send({messagem:'erro ao remover o projeto. por favor, tente novamente'})
    })
});

export default router;