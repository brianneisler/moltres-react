import { Component } from 'react';

export default function isComponentClass(value) {
  return value.prototype instanceof Component;
}
