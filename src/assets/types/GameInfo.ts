type GameInfo = {
	title: string;
	displayingTitle?: string;
	category: 'steam' | 'other';
	size: number;
	pathTo: string;
	uuid?: string;
};
