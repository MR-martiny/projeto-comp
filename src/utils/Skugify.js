
// isso é pra deixar bonito nas urls, o lower é pra deixar tudo minusculo, o replacement pra
// substituir os espaços por "-" e o remove é pra remover tudo o que nao for pertencente ao alfabeto

import slugify from 'slugify';


export default str => {
    return slugify(str, {
        lower: true,
        replacement: '-',
        remove: /[\x21-\x2F\x3A-\x40\x50-\x60\x70-\x7E]/g,
    })
}