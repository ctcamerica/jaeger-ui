// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as React from 'react';

type PropsType = {
  className?: string;
  k: string;
  value: string;
  traceStartTime: number;
  traceID: string;
};

type StateType = {
  hasCopied: boolean;
};

const moxdbBaseUrl = 'https://moxdb-firebase.web.app';

export default class MoxdbLink extends React.PureComponent<PropsType, StateType> {
  static generateQueryUrl(value: string) {
    // var queryUrl: string = moxdbBaseUrl + '/?hostname=' + value;
    const queryUrl: string = `${moxdbBaseUrl}/?hostname=${value}`;
    return queryUrl;
  }

  handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (this.props.k === 'hostname') {
      window.open(MoxdbLink.generateQueryUrl(this.props.value), '_blank');
    } else {
      /* eslint-disable no-console */
      console.log('Only hostname row can jump to Moxdb.');
      /* eslint-disable no-console */
    }
  }

  /* eslint-disable global-require */
  render() {
    return (
      <button type="button" onClick={e => this.handleClick(e)}>
        <img src={require('./images/moxdb-logo.png')} width="20%" height="auto" alt="Jump to Moxdb" />
      </button>
    );
  }
  /* eslint-disable global-require */
}
