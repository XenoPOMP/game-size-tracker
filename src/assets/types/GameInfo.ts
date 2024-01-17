export type OfficialProvider = 'steam' | 'egs';

export type GameInfo = {
	title: string;
	displayingTitle?: string;
	category: OfficialProvider | 'other';
	size: number;
	pathTo: string;
	uuid?: string;
};
