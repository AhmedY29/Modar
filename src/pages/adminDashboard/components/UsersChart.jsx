import { useSelector } from "react-redux";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
import { useTranslation } from "react-i18next";

export function UsersChart() {
  const users = useSelector((state) => state.auth.users);
  const { t } = useTranslation();
  const chartData = [
    {
      browser: t("Students"),
      visitors: users?.filter((user) => user.role == "student").length,
      fill: "orange",
    },
    {
      browser: t("Teachers"),
      visitors: users?.filter((user) => user.role == "teacher").length,
      fill: "blue",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    Student: {
      label: "Students",
      color: "var(--chart-1)",
    },
    Teachers: {
      label: "Teachers",
      color: "var(--chart-2)",
    },
  };
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{t("Users")}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
