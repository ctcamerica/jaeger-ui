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
  traceID: string;
  traceStartTime: number;
};

type StateType = {
  hasCopied: boolean;
};

const coralogixBaseUrl = 'https://ctc-america.coralogix.com/#/query-new/logs?query=';

export default class CoralogixLinkTraceId extends React.PureComponent<PropsType, StateType> {
  static generateQueryUrl(traceId: string, traceStartTime: number) {
    const startTraceTimeInMiliSeconds: number = Math.floor(traceStartTime / 1000);
    const starttime: string = String(startTraceTimeInMiliSeconds - 15 * 60 * 1000);
    const endtime: string = String(startTraceTimeInMiliSeconds + 15 * 60 * 1000);
    // const queryUrl: string =
    //  coralogixBaseUrl +
    //  traceId +
    //  '&' +
    //  'startTime=' +
    //  String(starttime) +
    //  '&' +
    //  'endTime=' +
    //  String(endtime);
    const queryUrl: string = `${coralogixBaseUrl}${traceId}&startTime=${starttime}&endTime=${endtime}`;
    return queryUrl;
  }

  handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    window.open(
      CoralogixLinkTraceId.generateQueryUrl(this.props.traceID, this.props.traceStartTime),
      '_blank'
    );
  }

  /* eslint-disable global-require */
  render() {
    return (
      <button type="button" onClick={e => this.handleClick(e)}>
        <img src={require('./images/coralogix-logo.png')} width="10%" height="auto" alt="Jump to Coralogix" />
      </button>
    );
  }
  /* eslint-disable global-require */
}