export interface IMultiLang<T> {
	lang: string
	value: T
}

export type MultiLangType<T> = IMultiLang<T> | IMultiLang<T>[]

export interface IGameDetail {
	gameId: string
	gameName: IMultiLang<string> | IMultiLang<string>[]
	image: string
	description: IMultiLang<string> | IMultiLang<string>[]
	rating: number
	tags: string[]
}

// export interface IGameDetailResponse {
// 	id: string
// 	gameName: {
// 		lang: string
// 		name: string
// 	}[]
// 	image: string
// 	description: {
// 		lang: string
// 		name: string
// 	}[]
// 	rating: number
// 	tags: string[]
// }

export interface IGameDetailProps {
	gameDetail: IGameDetail
}
