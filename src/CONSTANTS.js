import { Acacia, Aloevera, Hibiscus, Jasmine, Lavender, Lotus, Neem, Tulsi } from "./models/Models"

export const virtual_garden={
    title:"Virtual Herbal Garden",
    desc:"Discover a vibrant collection of medicinal plants in our Virtual Garden. Engage with detailed 3D models, learning about their botanical names, habitats, and healing properties. This interactive experience brings the wisdom of traditional AYUSH practices to your fingertips."
}
export const virtual_tour={
    title:"Virtual Tour",
    desc:"Take a guided tour through themed sections of our Virtual Herbal Garden. Explore plants beneficial for digestion, immunity, skincare, and more. Immerse yourself in an educational journey enriched with images, videos, and audio that highlight the therapeutic power of nature."
}

export const arr_Model_Mapper=[
    {name:"Aloe Vera",my_model:Aloevera},{name:"Lavender",my_model:Lavender},
    {name:"Lotus",my_model:Lotus},{name:"Jasmine",my_model:Jasmine},
    {name:"Tulsi",my_model:Tulsi},{name:"Neem",my_model:Neem},
    {name:"Acacia",my_model:Acacia},{name:"Hibiscus",my_model:Hibiscus},
]

export const api="http://192.168.137.59:5000/"
// export const api="http://localhost:5000/"
// export const api="http://172.16.49.39:5000/"