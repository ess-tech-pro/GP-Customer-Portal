import * as yup from 'yup'

export const FetchAppConfigResponseSchema = yup.object().shape({
  gameConfig: yup.object().shape({
    gameCategories: yup.array().of(yup.string()).required(),
    gameStatus: yup.array().of(yup.string()).required(),
    currencies: yup.array().of(yup.string()).required(),
    langs: yup.array().of(yup.string()).required(),
    volatility: yup.array().of(yup.string()).required(),
    drives: yup.array().of(yup.string()).required()
  }).required(),

  gameRegister: yup.object().shape({
    categories: yup.array().of(yup.string()).required(),
    status: yup.array().of(yup.string()).required(),
    gameType: yup.array().of(yup.string()).required(),
    orientation: yup.array().of(yup.string()).required(),
    gameEngine: yup.array().of(yup.string()).required(),
    event: yup.array().of(yup.string()).required()
  }).required(),

  organization: yup.object().shape({
    type: yup.array().of(yup.string()).required(),
    status: yup.array().of(yup.string()).required()
  }).required()
});

export type AppConfigResponse = yup.InferType<typeof FetchAppConfigResponseSchema>
