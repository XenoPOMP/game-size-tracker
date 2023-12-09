type GameInfo = {
	title: string;
	displayingTitle?: string;
	category: 'steam' | 'egs' | 'other';
	size: number;
	pathTo: string;
	uuid?: string;
};
