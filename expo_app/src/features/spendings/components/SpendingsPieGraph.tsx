import * as d3 from "d3";
import { View } from "react-native";
import { G, Svg, Text, Path } from "react-native-svg";

import { PIE_GRAPH_SETTING } from "../constants/graph";
import { PieGraphData, PieGraphDataPoint } from "../types/graph";

export default function SpendingsPieGraph({ data }: { data: PieGraphData }) {
  // TODO: there sometimes is no data in category summary

  // get graph settings
  const setting = PIE_GRAPH_SETTING;
  const svgWidth = setting.svg.width;
  const svgHeight = setting.svg.height;
  const radius = setting.pieRadius;

  const colors = d3.schemeCategory10;

  const pie = d3
    .pie<PieGraphDataPoint>()
    .value((d) => d.value)
    .sort((a, b) => b.value - a.value);

  const arc = d3
    .arc<d3.PieArcDatum<PieGraphDataPoint>>()
    .innerRadius(0)
    .outerRadius(radius);
  const arcLabel = d3
    .arc<d3.PieArcDatum<PieGraphDataPoint>>()
    .innerRadius(radius)
    .outerRadius(radius + 10);

  const pieData = pie(data.value);

  return (
    <View>
      <Svg width={svgWidth} height={svgHeight}>
        <G x={svgWidth / 2} y={svgHeight / 2}>
          {pieData.map((d, i) => (
            <G key={`pie section ${i}`}>
              <Path d={arc(d) || ""} fill={colors[i % colors.length]} />
              <Text
                x={arcLabel.centroid(d)[0]}
                y={arcLabel.centroid(d)[1]}
                textAnchor="middle"
                fontSize={12}
                fill="black"
              >
                {d.data.label}
              </Text>
            </G>
          ))}
        </G>
      </Svg>
    </View>
  );
}
