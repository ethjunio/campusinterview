"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const degreeData = [
  { name: "Master", value: 64 },
  { name: "Bachelor", value: 26 },
  { name: "PhD", value: 8 },
];

const studyData = [
  { name: "Engineering & Computer Science", value: 39 },
  { name: "Natural Science & Mathematics", value: 31 },
  { name: "Management & Economics", value: 22 },
  { name: "Other", value: 9 },
];
interface studyDataType {
  name: string;
  value: number;
}
interface proptype {
  data: studyDataType[];
}

const COLORS = ["#7C9BEF", "#5B6FD6", "#9ED9D8", "#6CB6E6"];

const CustomPieChart = ({ data }: proptype) => {
  return (
    <ResponsiveContainer width={250} height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          stroke="none"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const Legend = ({ data }: proptype) => {
  return (
    <div className="space-y-3">
      {data?.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <span className="text-gray-700 font-medium text-sm">
            {item.value}% {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function CompositionSection() {
  return (
    <section className="py-8 section-padding">
      <div
        className="max-w-7xl mx-auto px-[15px]
    md:px-[20px]
    md:px-[20px]
    lg:px-[30px]"
      >
        <div className="bg-card rounded-2xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 bg-gray-100">
            {/* Degree Composition */}
            <div
              className="bg-white rounded-[10px] 
                p-8 pt-8 px-3 pb-3
                max-w-[850px] w-full
                flex flex-col items-center justify-center
                gap-3 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-center text-lg mb-2 text-muted-foreground text-[#020418] text-[22px] leading-[26px]">
                Talent pool degree composition
              </h2>

              <div
                className="  grid
                grid-cols-1
                md:grid-cols-[auto_1fr]
                items-center
                gap-8
                w-full"
              >
                <CustomPieChart data={degreeData} />

                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold mb-4 text-left md:text-center">
                    Degree
                  </h3>

                  <div className="w-full flex justify-start ">
                    <Legend data={degreeData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Study Composition */}
            <div
              className="bg-white rounded-[10px] 
                p-8 pt-8 px-3 pb-3
                max-w-[850px] w-full
                flex flex-col items-center justify-center
                gap-3 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-center text-lg mb-2 text-muted-foreground text-[#020418] text-[22px] leading-[26px]">
                Talent pool degree composition
              </h2>

              <div
                className="  grid
                grid-cols-1
                md:grid-cols-[auto_1fr]
                items-center
                gap-8
                w-full"
              >
                <CustomPieChart data={studyData} />

                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold mb-4 text-left md:text-center">
                    Field of study
                  </h3>

                  <div className="w-full flex justify-start ">
                    <Legend data={studyData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
