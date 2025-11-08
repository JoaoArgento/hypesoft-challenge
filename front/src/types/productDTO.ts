export type ProductDTO =
{
    id: number;
    name: string;
    description?: string | undefined;
    price: number;
    category: string;
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