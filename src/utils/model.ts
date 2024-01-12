import { Component, DirectiveBinding } from 'vue';

export interface IFlipCardProps {
  data: number;
  label: string;
}

export interface IInitData {
  id: number;
  value: number;
  label: string;
}

export interface IFooterIcon<T extends string> {
  id: number;
  value: ImagePath<T>;
  component: Component;
}

export type ImagePath<T extends string> = `${string}.${T}`;

export interface MyDirectiveBinding<T> extends DirectiveBinding {
  value: T;
}
