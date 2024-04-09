import { useState, CSSProperties } from 'react';
import styles from '../../styles/index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	const [menu, setMenu] = useState(defaultArticleState);
	const [appliedStyles, setAppliedStyles] = useState({});

	const applyStyles = () => {
		setAppliedStyles({
			'--font-family': menu.fontFamilyOption.value,
			'--font-size': menu.fontSizeOption.value,
			'--font-color': menu.fontColor.value,
			'--container-width': menu.contentWidth.value,
			'--bg-color': menu.backgroundColor.value,
		} as CSSProperties);
	};

	const resetArticleStyles = () => {
		setAppliedStyles({});
	};

	return (
		<main className={styles.main} style={appliedStyles}>
			<ArticleParamsForm
				state={menu}
				setState={setMenu}
				applyStyles={applyStyles}
				resetArticleStyles={resetArticleStyles}
			/>
			<Article appliedStyles={appliedStyles} />
		</main>
	);
};
