import React, { createContext, useContext, useReducer, ReactNode, useMemo, useEffect } from 'react';
import { Box } from '../types/Box';

interface BoxState {
  boxes: Box[];
}

type BoxAction =
  | { type: 'ADD_BOX'; payload: Box }
  | { type: 'REMOVE_BOX'; payload: string }
  | { type: 'SET_BOXES'; payload: Box[] };

interface BoxContextType {
  boxes: Box[];
  addBox: (box: Box) => void;
  removeBox: (id: string) => void;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

const LOCAL_KEY = 'shipping_boxes_v1';

const boxReducer = (state: BoxState, action: BoxAction): BoxState => {
  switch (action.type) {
    case 'ADD_BOX':
      return { ...state, boxes: [...state.boxes, action.payload] };
    case 'REMOVE_BOX':
      return {
        ...state,
        boxes: state.boxes.filter((box) => box.id !== action.payload),
      };
    case 'SET_BOXES':
      return { ...state, boxes: action.payload };
    default:
      return state;
  }
};

export const BoxProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(boxReducer, { boxes: [] });

  // Hydrate from localStorage on mount (simulates "retrieve" endpoint)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Box[];
        dispatch({ type: 'SET_BOXES', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const persist = (boxes: Box[]) => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(boxes));
    } catch {
      // ignore storage errors
    }
  };

  const addBox = (box: Box) => {
    const updated = [...state.boxes, box];
    dispatch({ type: 'ADD_BOX', payload: box });
    persist(updated);
  };

  const removeBox = (id: string) => {
    const updated = state.boxes.filter((b) => b.id !== id);
    dispatch({ type: 'REMOVE_BOX', payload: id });
    persist(updated);
  };

  const value = useMemo(
    () => ({
      boxes: state.boxes,
      addBox,
      removeBox,
    }),
    [state.boxes]
  );

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>;
};

export const useBoxContext = () => {
  const context = useContext(BoxContext);
  if (!context) {
    throw new Error('useBoxContext must be used within a BoxProvider');
  }
  return context;
};
