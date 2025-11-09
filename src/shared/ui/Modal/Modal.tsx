import React, { createContext, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

interface ModalContextValue {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('Modal compound components must be used within <Modal>');
  }
  return ctx;
};

const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Ensure `.modal-content` exists even if consumer forgets to add <Modal.Body>
  const childrenArray = React.Children.toArray(children);

  const isOfType = (
    element: React.ReactNode,
    component: React.ElementType
  ): element is React.ReactElement => React.isValidElement(element) && element.type === component;

  const hasBody = childrenArray.some((child) => isOfType(child, Body));
  const hasHeader = childrenArray.some((child) => isOfType(child, Header));
  const ensuredBody = hasBody ? children : (
    <Body>
      {children}
    </Body>
  );
  const ensuredChildren = hasHeader ? ensuredBody : (
    <>
      <Header title={title} />
      {ensuredBody}
    </>
  );

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', padding: '16px', zIndex: 1000,
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '640px', maxHeight: '90vh', background: 'var(--modal-bg, #fff)',
          borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ModalContext.Provider value={{ onClose }}>
          {ensuredChildren}
        </ModalContext.Provider>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const Header: React.FC<{ children?: React.ReactNode; title?: string } > = ({ children, title }) => {
  const { onClose } = useModalContext();
  return (
    <div
      className="modal-header"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}
    >
      {children || title ? (
        <h2 style={{ margin: 0, fontSize: '18px', lineHeight: 1.2, flex: 1 }}>{children ?? title}</h2>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Close modal"
        style={{ background: 'transparent', border: 'none', fontSize: '20px', lineHeight: 1, cursor: 'pointer' }}
      >
        ×
      </button>
    </div>
  );
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal-content" style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
      {children}
    </div>
  );
};

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="modal-footer" style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
      {children}
    </div>
  );
};

export const Modal = Object.assign(ModalRoot, { Header, Body, Footer });

