import { GameInfo } from '@type/GameInfo';

export interface SizeDiagramProps {
	games?: Array<Pick<GameInfo, 'title' | 'size'>>;
	isLoading?: boolean;
}
