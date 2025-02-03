import * as yup from 'yup'

const GameListSchema = yup.object().shape({
    id: yup.number().required('ID is required'),
    thumbnail: yup.string().required('Thumbnail is required'),
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required'),
})

export const GameListResponseSchema = yup.object().shape({
    limit: yup.number().required('Limit is required'),
    skip: yup.number().required('Skip is required'),
    total: yup.number().required('Total is required'),
    GameLists: yup.array().of(GameListSchema).required('GameLists are required'),
})

export type GameListResponse = yup.InferType<typeof GameListResponseSchema>
