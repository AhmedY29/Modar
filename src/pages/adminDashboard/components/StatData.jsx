import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTeams } from "../../../redux/teamSlice";
import { getUsers } from "../../../redux/authSlice";
import { useTranslation } from "react-i18next";

export const description = "A bar chart with an active bar";
export function StatData() {
  const teams = useSelector((state) => state.team.teams);
  const users = useSelector((state) => state.auth.users);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
  }, []);
  const chartData = [
    {
      browser: t("Students"),
      visitors: users?.filter((user) => user.role == "student").length,
      fill: "var(--color-chrome)",
    },
    {
      browser: t("Teachers"),
      visitors: users?.filter((user) => user.role == "teacher").length,
      fill: "var(--color-safari)",
    },
    {
      browser: t("Teams"),
      visitors: teams?.length,
      fill: "var(--color-firefox)",
    },
    {
      browser: t("Ideas"),
      visitors: teams
        .map((team) => team.ideas.length)
        .reduce((sum, len) => sum + len, 0),
      fill: "var(--color-edge)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Students",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Teachers",
      color: "var(--chart-2)",
    },
    firefox: {
      label: "Teams",
      color: "var(--chart-3)",
    },
    edge: {
      label: "Edge",
      color: "var(--chart-4)",
    },
    other: {
      label: "Ideas",
      color: "var(--chart-5)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Modar Data")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" strokeWidth={2} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
