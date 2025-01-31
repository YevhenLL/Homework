import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BarChart, LineChart } from "@ui5/webcomponents-react-charts";
import lineChartIcon from '@ui5/webcomponents-icons/dist/line-chart.js';
import barChartIcon from '@ui5/webcomponents-icons/dist/horizontal-bar-chart.js';
import addIcon from "@ui5/webcomponents-icons/dist/add.js";
import {
    Avatar,
    Card,
    CardHeader,
    Text,
    ShellBar,
    ShellBarItem,
    List,
    StandardListItem,
    CustomListItem,
    ValueState,
    ProgressIndicator,
    FlexBox,
    FlexBoxJustifyContent,
    FlexBoxWrap,
    FlexBoxDirection,
    AnalyticalTable,
    Icon
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import listIcon from "@ui5/webcomponents-icons/dist/list.js";


function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const contentTitle = toggleCharts === 'lineChart' ? 'Line Chart' : 'Bar Chart';
  const switchToChart = toggleCharts === 'lineChart' ? 'Bar Chart' : 'Line Chart';
  const dataset = [
        {
            month: "January",
            data: 65
        },
        {
            month: "February",
            data: 59
        },
        {
            month: "March",
            data: 80
        },
        {
            month: "April",
            data: 81
        },
        {
            month: "May",
            data: 56
        },
        {
            month: "June",
            data: 55
        },
        {
            month: "July",
            data: 40
        }
    ];
  const handleHeaderClick = () => {
        if (toggleCharts === "lineChart") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("barChart");
            }, 2000);
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setToggleCharts("lineChart");
            }, 2000);
        }
    };
  return (
      <>
          <div>
              <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo"/>
              </a>
              <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <h1>Vite + React</h1>
          <ShellBar
              logo={<img src="reactLogo.png" />}
              profile={
                  <Avatar>
                      <img src="profilePictureExample.png" />
                  </Avatar>
              }
              primaryTitle="My App"
          >
              <ShellBarItem icon={addIcon} text="Add" />
          </ShellBar>
          <div>
              <Card
                  header={
                      <CardHeader
                          titleText="Stock Prices"
                          subtitleText={`Click here to switch to ${switchToChart}`}
                          interactive
                          onClick={handleHeaderClick}
                          avatar={
                              <Icon
                                  name={
                                      toggleCharts === "lineChart" ? lineChartIcon : barChartIcon
                                  }
                              />
                          }
                      />
                  }
                  style={{ width: "300px" }}
              >
                  <Text style={{fontSize: 20}}>{contentTitle}</Text>
                  {toggleCharts === "lineChart" ? (
                      <LineChart
                          dimensions={[{ accessor: "month" }]}
                          measures={[{ accessor: "data", label: "Stock Price" }]}
                          dataset={dataset}
                          loading={loading}
                      />
                  ) : (
                      <BarChart
                          dimensions={[{ accessor: "month" }]}
                          measures={[{ accessor: "data", label: "Stock Price" }]}
                          dataset={dataset}
                          loading={loading}
                      />
                  )}
              </Card>
          </div>
          <div>
              <Card
                  header={
                      <CardHeader
                          titleText="Progress"
                          subtitleText="List"
                          avatar={<Icon name={listIcon} />}
                      />
                  }
                  style={{ width: "300px" }}
              ></Card>
              <List>
                  <StandardListItem>Activity 1</StandardListItem>
              </List>
          </div>

          <p className="read-the-docs">
              Click on the Vite and React logos to learn more
          </p>
      </>
  )
}

export default App
