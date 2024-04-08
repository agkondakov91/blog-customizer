import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: Dispatch<SetStateAction<typeof defaultArticleState>>;
	applyStyles: () => void;
	resetArticleStyles: () => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
	applyStyles,
	resetArticleStyles,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [localState, setLocalState] = useState(state);

	const menuRef = useRef<HTMLDivElement>(null);

	const handleMenuOpen = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const handleFontSizeOptionChange = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const handleFontColorChange = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const handleBackgroundColorChange = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const handleContentWidthChange = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const handleResetForm = () => {
		setState(defaultArticleState);
		resetArticleStyles();
		setLocalState(localState);
	};

	const handleApplyStyles = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		applyStyles();
		setIsMenuOpen(false);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: menuRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton onClick={handleMenuOpen} isMenuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={menuRef}>
				<form className={styles.form}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleFontSizeOptionChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={state.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button
							title='Применить'
							type='submit'
							onClick={handleApplyStyles}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
