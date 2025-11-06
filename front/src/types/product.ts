export type ProductDTO =
{
    _id: string;
    name: string;
    description: string;
    price: number;
    category: number;
    amountInStock: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductCreateDTO = 
{
    name: string;
    description: string;
    price: number;
    category: number;
    amountInStock: number;
};