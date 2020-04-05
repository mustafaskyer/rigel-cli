import { findPath } from '../helper/helper';

import ls from '../listFiles';
import getComponentsList from '../options';

export default async function list(name, path) {
	const res = findPath(path);
	if (res.status) {
		return new Promise((resolv) =>
			ls(res.path, (result) =>
				getComponentsList(result, name, (answers) => {
					const _answers = answers.map((item) =>
						item.slice(0, -3).replace('.component', '').replace('.action', '')
					);
					resolv(_answers);
				})
			)
		);
	}
}
