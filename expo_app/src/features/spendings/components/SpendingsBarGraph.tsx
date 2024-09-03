import * as d3 from "d3";
import { ScrollView } from "react-native";
import { G, Rect, Svg, Text, Line } from "react-native-svg";

import { BAR_GRAPH_SETTING } from "../constants/graph";
import { BarGraphData } from "../types/graph";

export default function SpendingsBarGraph({ data }: { data: BarGraphData[] }) {
  // get graph settings
  const setting = BAR_GRAPH_SETTING;
  const svgWidth = setting.svg.widthInterval * data.length;
  const svgHeight = setting.svg.height;
  const graphMargin = setting.margin;
  const graphColor = setting.color;
  const barWidth = setting.barWidth;
  const rankNum = setting.rankNum;

  // scales
  const xScale = d3
    .scalePoint()
    .domain(data.map((item) => item.date))
    .range([0, svgWidth - (graphMargin.left + graphMargin.right)])
    .padding(1);
  const maxYScale =
    // rounding a maximum value for y scale to the order of 10000
    Math.ceil(d3.max(data, (item) => item.value)! / 10000) * 10000;
  const yScale = d3
    .scaleLinear()
    .domain([0, maxYScale])
    .range([0, svgHeight - (graphMargin.bottom + graphMargin.top)]);
  const ranks = Array.from({ length: rankNum }, (_, i) => i + 1);

  return (
    <ScrollView horizontal={true}>
      <Svg width={svgWidth} height={svgHeight}>
        <G
          x={graphMargin.left}
          y={svgHeight - graphMargin.bottom + graphMargin.top}
        >
          {/* bars */}
          {data.map((item) => (
            <Rect
              key={item.id}
              x={xScale(item.date)! - barWidth / 2}
              y={yScale(item.value) * -1}
              width={barWidth}
              height={yScale(item.value)}
              fill={graphColor.bars}
            />
          ))}

          {/* x-axis labels */}
          <Line
            x1={graphMargin.left}
            x2={svgWidth - graphMargin.right}
            y1={0}
            y2={0}
            stroke={graphColor.axis}
            strokeWidth={0.5}
          />
          {data.map((item) => (
            <Text
              key={item.id}
              fontSize="14"
              x={xScale(item.date)}
              y="15"
              textAnchor="middle"
            >
              {item.date}
            </Text>
          ))}

          {/* y-axis labels */}
          {ranks.map((i) => (
            <>
              <Line
                key={`y-axis line ${i}`}
                x1={graphMargin.left}
                x2={svgWidth - graphMargin.right}
                y1={((i * yScale(maxYScale)) / rankNum) * -1}
                y2={((i * yScale(maxYScale)) / rankNum) * -1}
                stroke={graphColor.axis}
                strokeWidth={0.5}
                strokeDasharray={[3, 3]}
              />
              <Text
                key={`y-axis label ${i}`}
                x={graphMargin.left}
                textAnchor="start"
                y={((i * yScale(maxYScale)) / rankNum) * -1 - 5}
                fontSize={12}
                fill="black"
                fillOpacity={0.6}
              >
                {(i * maxYScale) / rankNum}
              </Text>
            </>
          ))}
        </G>
      </Svg>
    </ScrollView>
  );
}