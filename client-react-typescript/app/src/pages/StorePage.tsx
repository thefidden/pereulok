import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../store.ts";
import { fetchStore } from "../slices/StoreSlice.ts";

import Loader from "../components/Loader.tsx";
import ProductCard from "../components/ProductCard.tsx";

import type { Product } from "../interfaces/ProductInterface.ts";
import type { StoreFilters } from "../interfaces/StoreFiltersInterface.ts";

export default function StorePage() {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    const { store, loading: storeLoading } = useAppSelector(state => state.store)
    const { loading: userLoading } = useAppSelector(state => state.user)

    const filters = useMemo(() => (
        {
            name: searchParams.get('name'),
            type: searchParams.get('type'),
            priceMin: parseInt(searchParams.get('price_min')) || null,
            priceMax: parseInt(searchParams.get('price_max')) || null
        } as StoreFilters
    ), [searchParams])

    useEffect(() => {
        dispatch(fetchStore({ filters }))
    }, [dispatch, filters])

    if (userLoading || storeLoading)
        return <Loader />

    return (
        <Root>{
            store.length
                ? <div className="productsGrid">{
                    store.map((product: Product, index: number) =>
                        <ProductCard key={ product.id }
                                     product={ product }
                                     animationDelay={ 0.1 * index }
                        />
                    )
                }</div>
                : <div className="noProducts">Товары не найдены</div>
        }</Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 50px;

    .productsGrid {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;

        gap: 50px;
    }

    .noProducts {
        display: flex;

        justify-content: center;
        align-items: center;

        font-family: 'Jost', serif;
        font-size: 48px;
        font-weight: var(--font-weight-bold);
        color: var(--color-magenta);

        width: 100%;
        min-height: 500px;
        border-radius: 100px;
        user-select: none;
    }
`
