import React from 'react';
import nanoid from 'nanoid';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Article } from 'src/zoo';
import { TDefault } from 'src/theme';
import Container from './container';
import NavBar from './nav_bar';
import { evaluate } from '../state_executor';
import { unwrapX, unwrapY } from '../unwrapper';

/* eslint-disable-next-line no-unused-expressions */
const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    height: 100%;
    min-height: 100%;
    font-family: helvetica;
    background-color: white;
  }
  * {
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    box-sizing: border-box;
    background-color: inherit;
  }
  h1 { font-size: 36px; }
  h2 { font-size: 32px; }
  h3 { font-size: 28px; }
  h4, label { font-size: 24px; }
  h5 { font-size: 20px; }
  h6, p, div { font-size: 16px; }
  small { font-size: 12px; }

  td, th {
    text-align: right;
    padding: 0 0.5em;
  }

  h1, h2 { font-family: impact; }
  label, small {
    font-family: Garamond, 'Trebuchet MS', Times, serif;
    font-style: italic;
  }
`;

// https://www.chartjs.org/docs/latest/charts/line.html#line-styling
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chart.js/index.d.ts

const { strip, log } = evaluate({}, 0);

const xVals = unwrapX(strip);
const yVals = unwrapY(strip);

const App = () => (
  <ThemeProvider theme={TDefault}>
    <>
      <GlobalStyle />
      <Container>
        <NavBar />
        <Article>
          <h1>S(4) largest busy-beaver</h1>
          <Line
            options={{
              scales: {
                xAxes: [
                  {
                    id: 'x-axis-position',
                    ticks: {
                      min: 0,
                      maxTicksLimit: 40,
                    },
                  },
                ],
              },
            }}
            data={{
              labels: log.reduce((res, _, i) => [...res, i], []),
              datasets: [
                {
                  lineTension: 0,
                  label: 'index',
                  xAxisID: 'x-axis-position',
                  data: log,
                },
              ],
            }}
          />
          <p>The resulting map of 0s and 1s, (index)</p>
          <table>
            <thead>
              <tr>
                {xVals.map(value => (
                  <th key={nanoid()}>{value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {yVals.map(value => (
                  <td key={nanoid()}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
          <p>(value)</p>
        </Article>
      </Container>
    </>
  </ThemeProvider>
);

export default App;
