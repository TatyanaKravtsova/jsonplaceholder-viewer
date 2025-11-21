import React, { useState, useCallback, type MouseEventHandler } from 'react';
import { Modal } from '../../shared/ui/Modal/Modal';
import { Button } from '../../shared/ui/Button/Button';
import { ThemeSwitcher } from '../../features/ThemeSwitcher/ui/ThemeSwitcher';

export const Header: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleAboutClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
    setIsAboutOpen(true);
  }, []);

  const handleCloseAbout = useCallback(() => {
    setIsAboutOpen(false);
  }, []);

  return (
    <>
      <header className="header">
        <h1>My Blog</h1>
        <div className="header-controls">
          <Button onClick={handleAboutClick}>О проекте</Button>
          <ThemeSwitcher />
        </div>
      </header>

      <Modal 
        isOpen={isAboutOpen} 
        onClose={handleCloseAbout}
        title="О проекте"
      >
        <div>
          <h3>JSONPlaceholder Viewer</h3>
          <p>
            Это приложение для просмотра постов из JSONPlaceholder API. 
            Проект реализован с использованием React, TypeScript и Vite.
          </p>
          <p>
            <strong>Основные возможности:</strong>
          </p>
          <ul>
            <li>Просмотр списка постов</li>
            <li>Переключение между светлой и тёмной темой</li>
            <li>Модальное окно с информацией о проекте</li>
            <li>Адаптивный дизайн</li>
          </ul>
          <p>
            <strong>Технологии:</strong>
          </p>
          <ul>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>CSS Variables для темизации</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Header;