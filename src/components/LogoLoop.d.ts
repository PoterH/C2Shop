import type { CSSProperties, Key, MemoExoticComponent, ReactNode, FC } from 'react';

export type LogoLoopImage = {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
  hoverColor?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoLoopNode = {
  node: ReactNode;
  title?: string;
  href?: string;
  hoverColor?: string;
  ariaLabel?: string;
};

export type LogoLoopItem = LogoLoopImage | LogoLoopNode;

export interface LogoLoopProps {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  layout?: 'line' | 'wave' | 'arc' | 'orbit';
  bend?: number;
  focus?: number;
  magnify?: number;
  tiltX?: number;
  tiltY?: number;
  step?: boolean;
  muted?: number;
  labels?: 'none' | 'inline' | 'below' | 'hover';
  draggable?: boolean;
  scrollBoost?: number;
  intro?: boolean;
  renderItem?: (item: LogoLoopItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

declare const LogoLoop: MemoExoticComponent<FC<LogoLoopProps>>;
export { LogoLoop };
export default LogoLoop;
