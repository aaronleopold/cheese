import React from 'react';

export enum ApplicationFlow {
  Home = 'Home',
  Recording = 'Recording',
  RecordingStopped = 'RecordingStopped',
  Screenshot = 'Screenshot',
}

interface IApplicationContext {
  flow: ApplicationFlow;
  setFlow(newFlow: ApplicationFlow): void;
}

const defaultContext: IApplicationContext = {
  flow: ApplicationFlow.Home,
  setFlow() {},
};

export const ApplicationContext =
  React.createContext<IApplicationContext>(defaultContext);
