import mongoose from '@/database';  //o "@" é pra indicar a pasta, nesse caso o database


const projectSchema = new mongoose.Schema({              //um esquema é a definição de dados q v salva no banco de dados
    title: {   
        type: String,
        required: true,
        unique: true
    },
    slug: {                           //é o titulo formatado na url de cada pagina dentro do site
        type: String,
        unique: true,
        required: true
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

export default mongoose.model('Project', ProjectSchema);
