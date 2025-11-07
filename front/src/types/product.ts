export type ProductDTO =
{
    _id: number;
    name: string;
    description: string;
    price: number;
    category: number;
    amountInStock: number;
};

export type ProductCreateDTO = 
{
    name: string;
    description?: string | undefined;
    price: number;
    category: string;
    amountInStock: number;
};