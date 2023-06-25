import mongoose from '@/database';  //o "@" é pra indicar a pasta, nesse caso o database
import Slugify from '@/utils/Slugify'; 

const projectSchema = new mongoose.Schema({              //um esquema é a definição de dados q v salva no banco de dados
    title: {   
        type: String,
        required: true,
        unique: true
    },
    slug: {                           //é o titulo formatado na url de cada pagina dentro do site
        type: String,
        unique: true,
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
   /* images: [
        {
            type: String,
            required: true 
        }
    ], */
    createdAt: {
        type: Date,
        default: Date.now,             //o prorpio servidor caso eu n mand uma data, ele coloca a do sistema
    },
});

projectSchema.pre('save', function(next){  
    const title = this.title;  
    this.slug = Slugify(title);               //isso faz com que essa linha seja executada antes da entrada do banco de dados,
    next();                                   // oque garante que o arq slugify vai ser executado primeiro
})

export default mongoose.model('Project', projectSchema);
