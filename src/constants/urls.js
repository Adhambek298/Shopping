
export const urls = {
    cantegories: {
        getList: 'https://6715a255772c4a9b.mokky.dev/categories',
        post: 'https://6715a255772c4a9b.mokky.dev/categories',
        updetal: (id) => `https://6715a255772c4a9b.mokky.dev/categories/${id}`,
        delete: (id) => `https://6715a255772c4a9b.mokky.dev/categories/${id}`,
        getOne: (id) => `https://6715a255772c4a9b.mokky.dev/categories/${id}`,
    },
    praducts: { 
        getList: 'https://6715a255772c4a9b.mokky.dev/Products',
        post: 'https://6715a255772c4a9b.mokky.dev/Products',
        updeta: (id) => `https://6715a255772c4a9b.mokky.dev/Products/${id}`,
        delete: (id) => `https://6715a255772c4a9b.mokky.dev/Products/${id}`,
        getOne: (id) => `https://6715a255772c4a9b.mokky.dev/Products/${id}`,
    },
    brands: { 
        getList: 'https://6715a255772c4a9b.mokky.dev/Brends',
        post: 'https://6715a255772c4a9b.mokky.dev/Brends',
        updeta: (id) => `https://6715a255772c4a9b.mokky.dev/Brends/${id}`,
        delete: (id) => `https://6715a255772c4a9b.mokky.dev/Brends/${id}`,
        getOne: (id) => `https://6715a255772c4a9b.mokky.dev/Brends/${id}`,
    },
     users: {
         getList: 'https://6715a255772c4a9b.mokky.dev/users',
         post: 'https://6715a255772c4a9b.mokky.dev/users',
         updeta: (id) => `https://6715a255772c4a9b.mokky.dev/users/${id}`,
         delete: (id) => `https://6715a255772c4a9b.mokky.dev/users/${id}`,
         getOne: (id) => `https://6715a255772c4a9b.mokky.dev/users/${id}`,
    }
}