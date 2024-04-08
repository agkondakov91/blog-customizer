import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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
		<div className={clsx(styles.main)} style={appliedStyles}>
			<ArticleParamsForm
				state={menu}
				setState={setMenu}
				applyStyles={applyStyles}
				resetArticleStyles={resetArticleStyles}
			/>
			<Article appliedStyles={appliedStyles} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
