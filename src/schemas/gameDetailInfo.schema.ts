export const GameDetailInfoRequestSchema = yup.object().shape({
	id: yup.number().required('ID is required'),
})

export const GameDetailInfoResponseSchema = yup.object().shape({
	errors: yup.array().of(yup.string()).required(),
	data: yup
		.object({
			gameId: yup.string().required(),
			gameName: yup
				.array()
				.of(
					yup
						.object({
							lang: yup.string().required(),
							name: yup.string().required(),
						})
						.required()
				)
				.required(),
			category: yup.string().required(),
			tags: yup.array().of(yup.string().required()).required(),
			status: yup.number().required(),
			langs: yup.array().of(yup.string().required()).required(),
			currency: yup.array().of(yup.string().required()).required(),
			icons: yup
				.array()
				.of(
					yup
						.object({
							lang: yup.string().required(),
							icon: yup.string().url().required(),
						})
						.required()
				)
				.required(),
			jackpots: yup.array().of(yup.string()),
			links: yup.array().of(yup.string().url().required()).required(),
			timeRunning: yup.number().required(),
			volatility: yup.string().required(),
			description: yup.string().required(),
			numId: yup.string().required(),
			minTotalBet: yup.number().required(),
			maxTotalBet: yup.number().required(),
			rtps: yup.array().of(yup.number().required()).required(),
			symbol: yup.string().required(),
			drives: yup.array().of(yup.string().required()).required(),
			mediaPacks: yup.array().of(yup.string().required()),
			gameData: yup.array().of(yup.string().required()),
			fileData: yup.array().of(yup.string().url().required()).required(),
			extraConfig: yup
				.array()
				.of(
					yup
						.object({
							type: yup.string().required(),
							minBetPerLine: yup.number().required(),
							maxMulWin: yup.number().required(),
							betMul: yup.number().required(),
							reel: yup.number().required(),
							rows: yup.number().required(),
							payType: yup.string().required(),
							symbolType: yup.string().required(),
							hitFrequency: yup.array().of(yup.string().required()).required(),
							hasReplay: yup.boolean().required(),
							hasBuySpin: yup.boolean().required(),
							hasInstantBonus: yup.boolean().required(),
							betPerLine: yup.number().required(),
							totalBet: yup.number().required(),
							gameOverview: yup.array().of(yup.string().required()),
							gameFormat: yup.string().required(),
						})
						.required()
				)
				.required(),
		})
		.required(),
})

export type IGameDetailInfoRequest = yup.InferType<
	typeof GameDetailInfoRequestSchema
>

export type IGameDetailInfoResponse = yup.InferType<
	typeof GameDetailInfoResponseSchema
>
