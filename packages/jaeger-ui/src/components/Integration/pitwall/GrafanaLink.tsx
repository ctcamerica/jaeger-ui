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

const grafanaBaseUrl = 'https://us-central1-ctca-pitwall.cloudfunctions.net/createGrafanaDashboard';

export default class GrafanaLink extends React.PureComponent<PropsType, StateType> {
  static generateQueryUrl(key: string, value: string, traceStartTime: number) {
    const startTraceTimeInMiliSeconds: number = Math.floor(traceStartTime / 1000);
    const starttime: number = startTraceTimeInMiliSeconds - 15 * 60 * 1000;
    const endtime: number = startTraceTimeInMiliSeconds + 15 * 60 * 1000;
    // const queryUrl: string =
    //  grafanaBaseUrl +
    //  '?host=' +
    //  value +
    //  '&' +
    //  'startTime=' +
    //  String(starttime) +
    //  '&' +
    //  'endTime=' +
    //  String(endtime) +
    //  '&name=grafana-prom-ne&datasource=Prometheus-GCP-jaeger-k8s';
    const queryUrl: string = `${grafanaBaseUrl}?host=${value}&startTime=${starttime}&endTime=${endtime}&name=grafana-prom-ne&datasource=Prometheus-GCP-jaeger-k8s`;
    return queryUrl;
  }

  handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (this.props.k === 'host.ip') {
      window.open(
        GrafanaLink.generateQueryUrl(this.props.k, this.props.value, this.props.traceStartTime),
        '_blank'
      );
    } else {
      /* eslint-disable no-console */
      console.log('Only host.ip row can jump to Grafana.');
      /* eslint-disable no-console */
    }
  }

  /* eslint-disable global-require */
  render() {
    return (
      <button type="button" onClick={e => this.handleClick(e)}>
        <img src={require('./images/grafana-logo.png')} width="5%" height="auto" alt="Jump to Grafana" />
      </button>
    );
  }
  /* eslint-disable global-require */
}
