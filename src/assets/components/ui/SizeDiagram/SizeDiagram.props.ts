export interface SizeDiagramProps {
	games?: Array<Pick<GameInfo, 'title' | 'size'>>;
	isLoading?: boolean;
}
