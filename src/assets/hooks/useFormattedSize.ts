import useLocalization from '@hooks/useLocalization';

import { formatDecimal } from '@utils/formatDecimal';

const useFormattedSize = (
	size: number,
	options?: Parameters<typeof formatDecimal>[1]
): string => {
	const loc = useLocalization();

	const bytesIn: Record<keyof typeof loc.measurementUnits, number> = {
		bytes: 1,
		kilobytes: 1024 ** 1,
		megabytes: 1024 ** 2,
		gigabytes: 1024 ** 3,
		terabytes: 1024 ** 4,
	};

	const convertTo = (
		target: number,
		unit: keyof typeof loc.measurementUnits
	): number => {
		return target / bytesIn[unit];
	};

	if (size > bytesIn.terabytes * 1024) {
		return `> ${1024} ${loc.measurementUnits.terabytes}`;
	}

	if (size > bytesIn.terabytes) {
		return `${formatDecimal(convertTo(size, 'terabytes'), options)} ${
			loc.measurementUnits.terabytes
		}`;
	}

	if (size > bytesIn.gigabytes) {
		return `${formatDecimal(convertTo(size, 'gigabytes'), options)} ${
			loc.measurementUnits.gigabytes
		}`;
	}

	if (size > bytesIn.megabytes) {
		return `${formatDecimal(convertTo(size, 'megabytes'), options)} ${
			loc.measurementUnits.megabytes
		}`;
	}

	if (size > bytesIn.kilobytes) {
		return `${formatDecimal(convertTo(size, 'kilobytes'), options)} ${
			loc.measurementUnits.kilobytes
		}`;
	}

	if (size > bytesIn.bytes) {
		return `${formatDecimal(convertTo(size, 'bytes'), options)} ${
			loc.measurementUnits.bytes
		}`;
	}

	return `${formatDecimal(size, options)} ${loc.measurementUnits.bytes}`;
};

export default useFormattedSize;
