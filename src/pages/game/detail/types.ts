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
	links: string[]
	timeRunning: string
	numId: string
	rtps: number[]
	extraConfig: {
		minBetPerLine: string
		totalBet: number
		reel: number
		rows: number
		type: string
		symbolType: string
		betMul: number
		maxMulWin: number
		hitFrequency: string[]
		hasReplay: boolean
		hasBuySpin: boolean
	}[]
	volatility: string
	drives: string[]
}

export interface IGameDetailProps {
	gameDetail: IGameDetail
}

export interface IGalleryItem {
	id: number
	title: string
	value: string
}
