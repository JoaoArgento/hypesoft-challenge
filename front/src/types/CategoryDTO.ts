export type CategoryDTO = 
{
    id: number,
    name: string
}

export type CategoryCreateDTO = 
{
    name: string,
    description?: string | undefined,
}