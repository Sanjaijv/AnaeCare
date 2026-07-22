import React from 'react';
import { Loader } from '../common/Loader';

interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = 'Loading...' }: LoadingViewProps) {
  return <Loader message={message} />;
}
