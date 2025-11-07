import React, {useState} from "react";
import { useProducts, useCreateProduct, useDeleteProduct, useUpdateProduct, useUpdateStock} from "../hooks/useProducts";
import { ProductForm } from "../components/forms/ProductForm";
// import { useQuery } from "@tanstack/react-query";
import type { ProductDTO } from "../types/product";



export default function Products()
{
    const [search, SetSearch] = useState("");
    const [category, SetCategory] = useState<string | undefined>();
    const {data: products = []} = useProducts({search, category})
    const create = useCreateProduct();
    const remove = useDeleteProduct();
    const updateStock = useUpdateStock();

    // const lowStockProducts = products.filter((p: any) => p.amountInStock < 10);

    return(
        <div>
            <h1>Produtos</h1>
            <div>
                <input value = {search} onChange={(e) => SetSearch(e.target.value)}></input>
                <select value ={category ?? ""} onChange={(e) => SetCategory(e.target.value)}>
                    <option value = "A">
                        Bolo
                    </option>
                </select>
            </div>
            <h2>Lista de produtos</h2>
            <ul>
                {Array.isArray(products) && products.map((p: ProductDTO) =>
                {
                    return <li key = {p._id}>
                        <div>
                            <strong>{p.name}</strong>
                            <div>Preço: R$ {p.price.toFixed(2)}</div>
                            <div>Estoque: {p.amountInStock} {p.amountInStock < 10 && <span>Baixo</span>}</div>
                        </div>
                        <div>
                            <button onClick={() => remove.mutate(p._id)}>Excluir</button>
                            <button onClick={() => {
                                const newStockAmount = Number(prompt("Novo estoque: ", String(p.amountInStock)));
                                if (!Number.isNaN(newStockAmount))
                                {
                                    updateStock.mutate({id: p._id, amount: newStockAmount})

                                }}}> Atualizar estoque</button>

                        </div>
                    </li>
                })
                }
            </ul>

            <h2>Criar produto</h2>
            <ProductForm defaultValues = {{name: "", price: 0, category: ""}}
                        onSubmit={(productCreateDTO) => {console.log(productCreateDTO); create.mutate(productCreateDTO)}}
                        submitLabel="Create" />

        </div>
    )
}